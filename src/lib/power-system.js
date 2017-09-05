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

import { addValues, subValues } from './helpers/power-helpers.js';

// StructureTile -> (a -> b)
const computeVariablePower = x => map(evolve({value: multiply(prop('capacity', x))}), prop('variation', x));
const setVariablePower = x => set(lensProp('power'), computeVariablePower(x), x);

const computeNonVarPower = load => cap => map(r => {
  if (r.value <= 0) return assoc('value', 0, r);
  return (r.value <= cap) ? r : assoc('value', cap, r);
}, load);

const setNonVarPower = load => x => set(lensProp('power'), computeNonVarPower(load)(prop('capacity', x)), x);
const power = pluck('power');

export function computeSystemOutput (data, sts) {
  const consumers = sts
    .filter(propEq('category', 'consumer'))
    .map(setVariablePower);

  if (consumers.length == 0) return sts.map(assoc('power', []));

  const primary = sts.filter(propEq('priority', 2))
    .map(setVariablePower);

  const load0 = addValues(power(consumers));
  const primaryPower = addValues(power(primary));
  const load1 = subValues([load0, primaryPower]);

  const secondary = sts.filter(propEq('priority', 1))
    .map(setNonVarPower(load1));

  const secondaryPower = addValues(power(secondary));
  const load2 = subValues([load1, secondaryPower]);

  const backup = sts.filter(propEq('priority', 0))
    .map(setNonVarPower(load2));

  return unionWith(
    eqBy(prop('id')),
    unnest([consumers, primary, secondary, backup]),
    sts);
}
