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
import ifElse from 'ramda/src/ifElse';
import identity from 'ramda/src/identity';
import always from 'ramda/src/always';

import { addValues, subValues } from './helpers/power-helpers.js';
import {setControl, noControl} from './helpers/ramp-control.js';

// StructureTile -> (a -> b)
const mapVariablePower = (data, x) => map(evolve({value: multiply(x.capacity)}), data[x.variation]);
const setVariablePower = data => x => set(lensProp('power'), mapVariablePower(data, x), x);

const computeNonVarPower = (load, x) =>
  map(l => {
    const base = x.capacity * x.base;
    if (l.value <= base) return assoc('value', base, l);
    return (l.value <= x.capacity) ? l : assoc('value', x.capacity, l);
  })(load);

const setNonVarPower = load => x => set(lensProp('power'), computeNonVarPower(load, x), x);
const power = pluck('power');
const control = pluck('control');

export const computeSystemOutput = data => xs => {
  const consumers = compose(
    map(setVariablePower(data)),
    filter(propEq('category', 'consumer'))
  )(xs);

  const battery = filter(propEq('category', 'battery'), xs);

  if (isEmpty(consumers)) return map(assoc('power', []), xs);

  const load0 = addValues(power(consumers));

  const primary = compose(
    map(compose(
      ifElse(
        always(isEmpty(battery)),
        noControl,
        setControl
      ),
      setVariablePower(data))),
    filter(propEq('priority', 2))
  )(xs);

  const primaryPower = addValues(power(primary));
  const primaryControl = addValues(control(primary));
  const load1 = subValues([load0, primaryControl]);

  const secondary = compose(
    map(compose(setControl, setNonVarPower(load1))),
    filter(propEq('priority', 1))
  )(xs);

  const secondaryControl = addValues(control(secondary));
  const load2 = subValues([load1, secondaryControl]);

  const bat = map(() => {
    const batState = subValues([primaryPower, primaryControl, load2]);
    return assoc('power', batState, battery[0]);
  }, battery);

  const load3 = ifElse(
    always(isEmpty(battery)),
    identity,
    map(assoc('value', 0))
  )(load2);

  const backup = compose(
    map(compose(setControl, setNonVarPower(load3))),
    filter(propEq('priority', 0))
  )(xs);

  return unionWith(
    eqBy(prop('id')),
    unnest([consumers, primary, secondary, backup, bat]),
    xs);
};
