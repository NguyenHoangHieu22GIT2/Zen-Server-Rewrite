import { Test, TestingModule } from '@nestjs/testing';
import { AuthServiceStable } from './stable/auth.stable.service';

describe('AuthService', () => {
  let service: AuthServiceStable;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthServiceStable],
    }).compile();

    service = module.get<AuthServiceStable>(AuthServiceStable);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
