import { Test, TestingModule } from '@nestjs/testing';
import { DispatchAuthClientService } from './dispatch-auth-client.service';

describe('DispatchAuthClientService', () => {
  let service: DispatchAuthClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchAuthClientService],
    }).compile();

    service = module.get<DispatchAuthClientService>(DispatchAuthClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
