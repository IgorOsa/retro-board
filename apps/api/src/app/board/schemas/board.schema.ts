import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  Prop,
  Schema as MongooseSchema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IBoard } from '@retro-board/api-interfaces';
import { Column } from './column.schema';

export type BoardDocument = Board & Document;

@MongooseSchema({
  versionKey: false,
})
export class Board implements IBoard {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  _id: string;

  @ApiProperty({ example: 'Demo Board' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  userId: string;

  columns: Column[];

  @ApiProperty({ example: '2021-11-18T15:31:49.451Z' })
  @Prop({ default: Date.now })
  created?: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);

export class BoardCreateRequest extends OmitType(Board, [
  '_id',
  'columns',
  'created',
] as const) {}

export class BoardCreateResponse extends Board {}
