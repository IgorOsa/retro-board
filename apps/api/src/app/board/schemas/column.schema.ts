import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IColumn } from '@retro-board/api-interfaces';
import { Task } from './task.schema';

@Schema({
  versionKey: false,
})
export class Column implements IColumn {
  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: [Task] })
  @Prop({ required: true })
  tasks: Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
