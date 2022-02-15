import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerMatchHistory, PlayerMatchHistorySchema } from 'src/schemas/player-match-history.schema';
import { PlayerMatchHistoryController } from './player-match-history.controller';
import { PlayerMatchHistoryService } from './player-match-history.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "PlayerMatchHistory", schema: PlayerMatchHistorySchema }])],
    controllers: [PlayerMatchHistoryController],
    providers: [PlayerMatchHistoryService],
})
export class PlayerMatchHistoryModule {}
