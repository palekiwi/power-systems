import { timeParse } from 'd3';

export function timeFromInt (n) {
  return (n < 10) ? `0${n}:00` : `${n}:00`;
}

// String -> Date
export function parseHM (s) {
  return timeParse('%H:%M')(s);
}
