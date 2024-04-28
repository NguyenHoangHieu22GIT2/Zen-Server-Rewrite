export function isNullOrUndefined(value: unknown): value is null {
  return value == null || typeof value == 'undefined';
}
