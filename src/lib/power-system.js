/* eslint-disable no-console */
import assoc from 'ramda/src/assoc';
import evolve from 'ramda/src/evolve';
import multiply from 'ramda/src/multiply';
import lensProp from 'ramda/src/lensProp';
import map from 'ramda/src/map';
import set from 'ramda/src/set';
import pluck from 'ramda/src/pluck';
import unnest from 'ramda/src/unnest';
import propEq from 'ramda/src/propEq';
import unionWith from 'ramda/src/unionWith';
import eqBy from 'ramda/src/eqBy';
import prop from 'ramda/src/prop';
import compose from 'ramda/src/compose';
import filter from 'ramda/src/filter';
import isEmpty from 'ramda/src/isEmpty';

import { addValues, subValues } from './helpers/power-helpers.js';
import {setControl} from './helpers/ramp-control.js';

// StructureTile -> (a -> b)
const computeVariablePower = x => map(evolve({value: multiply(prop('capacity', x))}), prop('variation', x));
const mapVariablePower = (data, x) => map(evolve({value: multiply(x.capacity)}), data[x.variation]);
const setVariablePower = data => x => set(lensProp('power'), mapVariablePower(data, x), x);
const setVariablePowerBy = (fn, data) => compose(
  map(setVariablePower(data)),
  filter(fn)
);

const computeNonVarPower = load => cap =>
  map(r => {
    if (r.value <= 0) return assoc('value', 0, r);
    return (r.value <= cap) ? r : assoc('value', cap, r);
  })(load);

const setNonVarPower = load => x => set(lensProp('power'), computeNonVarPower(load)(prop('capacity', x)), x);
const power = pluck('power');
const control = pluck('control');

export const computeSystemOutput = data => xs => {
  const consumers = setVariablePowerBy(propEq('category', 'consumer'), data)(xs);
  const battery = filter(propEq('category', 'battery'), xs);

  if (isEmpty(consumers)) return map(assoc('power', []), xs);

  const load0 = addValues(power(consumers));

  if (isEmpty(battery)) {
    console.log('no battery');
    const primary = setVariablePowerBy(propEq('priority', 2), data)(xs);
    const primaryPower = addValues(power(primary));
    const load1 = subValues([load0, primaryPower]);

    const secondary = xs.filter(propEq('priority', 1))
      .map(setNonVarPower(load1));

    const secondaryPower = addValues(power(secondary));
    const load2 = subValues([load1, secondaryPower]);

    const backup = xs.filter(propEq('priority', 0))
      .map(setNonVarPower(load2));

    return unionWith(
      eqBy(prop('id')),
      unnest([consumers, primary, secondary, backup]),
      xs);
  } else {
    console.log('battery');
    const primary = compose(map(setControl), setVariablePowerBy(propEq('priority', 2), data))(xs);
    const primaryPower = addValues(power(primary));
    const primaryControl = addValues(control(primary));
    const load1 = subValues([load0, primaryControl]);

    const secondary = xs.filter(propEq('priority', 1))
      .map(setNonVarPower(load1));

    const secondaryPower = addValues(power(secondary));
    const load2 = subValues([load1, secondaryPower]);

    const backup = xs.filter(propEq('priority', 0))
      .map(setNonVarPower(load2));

    const bat = assoc('power', subValues([primaryPower, primaryControl]), battery[0]);

    return unionWith(
      eqBy(prop('id')),
      unnest([consumers, primary, secondary, backup, bat]),
      xs);
  }
};
