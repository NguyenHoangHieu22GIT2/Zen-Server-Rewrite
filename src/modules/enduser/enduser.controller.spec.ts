import { Test, TestingModule } from '@nestjs/testing';
import { EnduserController } from './enduser.controller';
import { EnduserService } from './enduser.service';

describe('EnduserController', () => {
  let controller: EnduserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnduserController],
      providers: [EnduserService],
    }).compile();

    controller = module.get<EnduserController>(EnduserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
