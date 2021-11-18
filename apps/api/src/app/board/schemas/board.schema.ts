import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IBoard } from '@retro-board/api-interfaces';
import { Column } from './column.schema';

@Schema({
  versionKey: false,
})
export class Board implements IBoard {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty()
  userId: string;

  @ApiProperty({ type: [Column] })
  @Prop({ required: true })
  columns: Column[];

  @ApiProperty()
  @Prop({ default: Date.now })
  created: Date;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
