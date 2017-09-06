import assoc from 'ramda/src/assoc';
import reduce from 'ramda/src/reduce';
import append from 'ramda/src/append';
import head from 'ramda/src/head';
import tail from 'ramda/src/tail';
import last from 'ramda/src/last';
import isEmpty from 'ramda/src/isEmpty';

const f = (ramp, xs) => reduce((acc, cur) => append(computeControl(ramp, last(acc), cur), acc), [head(xs)], tail(xs));

export function setControl (x) {
  const power = x.power;
  const ramp = x.capacity * x.ramp;
  if (ramp == 1) return noControl(x); // ramp of 1 means no ramp control
  return isEmpty(power) ? [] : assoc('control', f(ramp, power), x);
}

function computeControl (ramp, a,b) {
  if (a.value - b.value > ramp) return assoc('value', a.value - ramp, b);
  if (a.value - b.value < -ramp) return assoc('value', a.value + ramp, b);
  return b;
}

export function noControl (x) {
  return assoc('control', x.power, x);
}
