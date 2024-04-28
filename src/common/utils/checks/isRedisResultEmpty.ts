export function isRedisResultEmpty(value: object) {
  return Object.keys(value).length == 0;
}
