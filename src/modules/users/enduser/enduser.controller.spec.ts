import { Test, TestingModule } from '@nestjs/testing';
import { EnduserController } from './enduser.controller';
import { EnduserServiceUnstable } from './services/enduser.unstable.service';

describe('EnduserController', () => {
  let controller: EnduserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnduserController],
      providers: [EnduserServiceUnstable],
    }).compile();

    controller = module.get<EnduserController>(EnduserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
