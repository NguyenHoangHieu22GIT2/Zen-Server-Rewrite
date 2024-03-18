export const ClassMethodsDecorator =
  (
    modification: (originalMethod: any, ...args: any[]) => Promise<any>,
  ): (() => ClassDecorator) =>
  () => {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (target: Function) => {
      const prototype = target.prototype;
      const propertyNames = Object.getOwnPropertyNames(prototype);

      propertyNames.forEach((propertyName) => {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(
          prototype,
          propertyName,
        );
        if (
          propertyDescriptor &&
          typeof propertyDescriptor.value === 'function'
        ) {
          const originalMethod = propertyDescriptor.value;
          propertyDescriptor.value = async function (...args: any[]) {
            const result = await modification(originalMethod, args);
            return result;
          };
          Object.defineProperty(prototype, propertyName, propertyDescriptor);
        }
      });
    };
  };
