export type ObjectToHashType<T extends object> = {
  [K in keyof T]: string;
};
