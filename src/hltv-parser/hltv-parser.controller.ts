import { Controller, Get, Injectable, Param } from '@nestjs/common';
import { HltvParserService } from './hltv-parser.service';
import * as fs from 'fs';
import { PlayerMatchHistorySchema, PlayerMatchHistoryDocument, PlayerMatchHistory } from 'src/schemas/player-match-history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('hltv-parser')
@Injectable()
export class HltvParserController {
    constructor(private readonly hltvParserService: HltvParserService, @InjectModel("PlayerMatchHistory") private readonly PlayerMatchHistoryModel: Model<PlayerMatchHistory> ) {}

    @Get(':id')
    async getMatchesByPlayer(@Param() params): Promise<any> {
        const id = params.id;
        const res = await this.hltvParserService.calculateMatchHistory(id);
        return res;
    }
}
