export type ClassFocusMethod<T> = Partial<T>;

export type MockedMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? jest.Mock : T[K];
};
