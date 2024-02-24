import { tryCatchModified } from 'src/common/utils';

export const TryCatchAllMethods = (): ClassDecorator => {
  return (target: any) => {
    // target.prototyp meaning we get the whole class that we decorated with
    const prototype = target.prototype;
    // Get all the property names (function | method) in the class
    const propertyNames = Object.getOwnPropertyNames(prototype);

    // We loop to each function in the class
    propertyNames.forEach((propertyName) => {
      // We get the descriptor of the function by targeting
      // to the prototype and the propertyName, so that we
      // can get the descriptor for the function
      const propertyDescriptor = Object.getOwnPropertyDescriptor(
        prototype,
        propertyName,
      );
      // We check if the propertyDescriptor is a function or not
      // I don't why we check this to be honest, CHATGPT tells me so.
      if (
        propertyDescriptor &&
        typeof propertyDescriptor.value === 'function'
      ) {
        // We store the originalMethod (meaning the methods in the class
        // we decorated with )
        const originalMethod = propertyDescriptor.value;
        // The cool thing is it automatically gets the args from the function
        // and I don't know how it does that, JS MAGIC
        propertyDescriptor.value = async function (...args: any[]) {
          console.log(...args);
          // Then we use the tryCatchModified to call the originalMethod
          return tryCatchModified(() => originalMethod.apply(this, args));
        };
        // Then we define the property again to the prototype when we changed it.
        Object.defineProperty(prototype, propertyName, propertyDescriptor);
      }
    });
  };
};
