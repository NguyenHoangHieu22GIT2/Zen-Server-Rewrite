import { RedisClient } from '../redis';
import { ClassMethodsDecorator } from './ClassMethods.Decorator';

export const ExecuteIfRedisAvailableDecorator = ClassMethodsDecorator(
  async (originalMethod, args) => {
    if (RedisClient.isOpen) {
      const result = await originalMethod.apply(this, args);
      return result;
    }
  },
);
