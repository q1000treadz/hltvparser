import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerMatchHistory, PlayerMatchHistorySchema } from 'src/schemas/player-match-history.schema';
import { HltvParserController } from './hltv-parser.controller';
import { HltvParserService } from './hltv-parser.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: "PlayerMatchHistory", schema: PlayerMatchHistorySchema }])],
    controllers: [HltvParserController],
    providers: [HltvParserService],
})
export class HltvParserModule {}
