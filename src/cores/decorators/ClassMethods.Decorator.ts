// THIS IS REALLY HARD TO UNDERSTAND FOR NHAT, ONLY FIX THIS IF YOU KNOW WHAT YOU ARE DOING.
// I REALLY TRIED TO UNDERSTAND MY CODES, BUT I CAN't, SO IF FUTURE ME CAN DOCUMENT THIS BETTER, IT WILL BE FANSTATIC, MOST PROBLEMS WILL BE RELEVANT TO THE KEYWORD `this`, SO KNOW WHAT YOU ARE DOING, AND YOU'LL BE FINE :)
export const ClassMethodsDecorator = (
  modification: (
    _this: any,
    originalMethod: any,
    ...args: any[]
  ) => Promise<any>,
): (() => ClassDecorator) =>
  function () {
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
            const result = await modification(this, originalMethod, args);
            return result;
          };
          Object.defineProperty(prototype, propertyName, propertyDescriptor);
        }
      });
    };
  };
