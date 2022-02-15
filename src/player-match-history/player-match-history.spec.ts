import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMatchHistoryService } from './player-match-history.service';

describe('PlayerMatchHistoryService', () => {
  let service: PlayerMatchHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerMatchHistoryService],
    }).compile();

    service = module.get<PlayerMatchHistoryService>(PlayerMatchHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
