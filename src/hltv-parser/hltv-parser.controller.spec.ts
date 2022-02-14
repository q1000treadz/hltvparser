import { Test, TestingModule } from '@nestjs/testing';
import { HltvParserController } from './hltv-parser.controller';

describe('HltvParserController', () => {
  let controller: HltvParserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HltvParserController],
    }).compile();

    controller = module.get<HltvParserController>(HltvParserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
