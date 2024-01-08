export type StringifyProperties<T> = {
  [K in keyof T]: string;
};
