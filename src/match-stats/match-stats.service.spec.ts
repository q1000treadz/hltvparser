import { Test, TestingModule } from '@nestjs/testing';
import { MatchStatsService } from './match-stats.service';

describe('MatchStatsService', () => {
  let service: MatchStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchStatsService],
    }).compile();

    service = module.get<MatchStatsService>(MatchStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
