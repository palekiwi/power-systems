export function timeFromInt (n) {
  return (n < 10) ? `0${n}:00` : `${n}:00`;
}
