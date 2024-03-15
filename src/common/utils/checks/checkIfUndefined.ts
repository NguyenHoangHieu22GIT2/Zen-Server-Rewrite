export function checkIfUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined';
}
