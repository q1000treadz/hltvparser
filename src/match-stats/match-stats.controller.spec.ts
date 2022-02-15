import { Test, TestingModule } from '@nestjs/testing';
import { MatchStatsController } from './match-stats.controller';

describe('MatchStatsController', () => {
  let controller: MatchStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchStatsController],
    }).compile();

    controller = module.get<MatchStatsController>(MatchStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
