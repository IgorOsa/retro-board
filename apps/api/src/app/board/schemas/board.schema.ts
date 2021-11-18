import { ApiProperty } from '@nestjs/swagger';
import {
  Prop,
  Schema as MongooseSchema,
  SchemaFactory,
} from '@nestjs/mongoose';

import { IBoard } from '@retro-board/api-interfaces';
import { Column, ColumnSchema } from './column.schema';

@MongooseSchema({
  versionKey: false,
})
export class Board implements IBoard {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  id: string;

  @ApiProperty({ example: 'Demo Board' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  userId: string;

  @ApiProperty({ type: [Column] })
  @Prop({ default: [], type: [ColumnSchema] })
  columns: [Column];

  @ApiProperty({ example: '2021-11-18T15:31:49.451Z' })
  @Prop({ default: Date.now })
  created: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
