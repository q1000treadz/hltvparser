import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerMatchHistoryController } from './player-match-history/player-match-history.controller';
import { PlayerMatchHistoryService } from './player-match-history/player-match-history.service';
import { PlayerMatchHistoryModule } from './player-match-history/player-match-history.module';
import { MatchStatsController } from './match-stats/match-stats.controller';
import { MatchStatsService } from './match-stats/match-stats.service';
import { MatchStatsModule } from './match-stats/match-stats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/hltv'), PlayerMatchHistoryModule, MatchStatsModule, AuthModule],
  controllers: [AppController, MatchStatsController],
  providers: [AppService, MatchStatsService],
})
export class AppModule {}
