import { timeParse } from 'd3';
import evolve from 'ramda/src/evolve';

export function timeFromInt (n) {
  return (n < 10) ? `0${n}:00` : `${n}:00`;
}

// String -> Date
export function parseHM (s) {
  return timeParse('%H:%M')(s);
}

export function parseHMS (s) {
  return timeParse('%H:%M:%S')(s);
}

export function parseDate (x) {
  return evolve({date: parseHM}, x);
}
