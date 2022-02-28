import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({unique: true})
  id: number;

  @Prop()
  login: string;

  @Prop()
  password: string;

  @Prop({nullable: true})
  name: string;
};
export const UsersSchema = SchemaFactory.createForClass(Users);