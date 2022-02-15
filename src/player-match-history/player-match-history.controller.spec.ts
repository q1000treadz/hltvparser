import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMatchHistoryController } from './player-match-history.controller';

describe('PlayerMatchHistoryController', () => {
  let controller: PlayerMatchHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerMatchHistoryController],
    }).compile();

    controller = module.get<PlayerMatchHistoryController>(PlayerMatchHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
