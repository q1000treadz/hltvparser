import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
export type PlayerMatchHistoryDocument = PlayerMatchHistory & Document;

@Schema()
export class PlayerMatch {
  @Prop()
  id: number;

  @Prop()
  team1: string;
  
  @Prop()
  team2: string;
                    
  @Prop()
  map: string; 
                    
  @Prop()
  kills: number;
                    
  @Prop()
  deaths: number;
                    
  @Prop()
  diff: number;
                    
  @Prop()
  rating: number;
};

@Schema()
export class PlayerMatchHistory {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop([PlayerMatch])
  matches: Array<PlayerMatch>;
};
/*
export const PlayerMatchHistorySchema = new mongoose.Schema({
  id: Number,
  name: String,
  matches: Array<PlayerMatch>
});*/

export const PlayerMatchHistorySchema = SchemaFactory.createForClass(PlayerMatchHistory);