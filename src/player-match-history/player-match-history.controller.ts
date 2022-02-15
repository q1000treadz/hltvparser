import { Controller, Get, Injectable, Param } from '@nestjs/common';
import { PlayerMatchHistoryService } from './player-match-history.service';
import * as fs from 'fs';
import { PlayerMatchHistorySchema, PlayerMatchHistoryDocument, PlayerMatchHistory } from 'src/schemas/player-match-history.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Controller('player-match-history')
@Injectable()
export class PlayerMatchHistoryController {
    constructor(private readonly PlayerMatchHistoryService: PlayerMatchHistoryService, @InjectModel("PlayerMatchHistory") private readonly PlayerMatchHistoryModel: Model<PlayerMatchHistory> ) {}

    @Get(':id')
    async getMatchesByPlayer(@Param() params): Promise<any> {
        const id = params.id;
        const res = await this.PlayerMatchHistoryService.calculateMatchHistory(id);
        return res;
    }
}
