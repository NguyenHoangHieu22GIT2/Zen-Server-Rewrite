import { RedisClient } from '../redis';
import { ClassMethodsDecorator } from './ClassMethods.Decorator';

export const ExecuteIfRedisAvailableDecorator = ClassMethodsDecorator(
  async (_this, originalMethod, args) => {
    if (RedisClient.isOpen) {
      const result = await originalMethod.apply(_this, args);
      return result;
    }
  },
);
