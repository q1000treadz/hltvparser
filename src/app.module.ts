import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HltvParserController } from './hltv-parser/hltv-parser.controller';
import { HltvParserService } from './hltv-parser/hltv-parser.service';
import { HltvParserModule } from './hltv-parser/hltv-parser.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/hltv'), HltvParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
