import { Test, TestingModule } from '@nestjs/testing';
import { HltvParserService } from './hltv-parser.service';

describe('HltvParserService', () => {
  let service: HltvParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HltvParserService],
    }).compile();

    service = module.get<HltvParserService>(HltvParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
