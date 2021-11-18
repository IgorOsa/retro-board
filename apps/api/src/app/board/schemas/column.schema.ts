import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';

import { IColumn } from '@retro-board/api-interfaces';
import { Task } from './task.schema';

@Schema({
  versionKey: false,
})
export class Column implements IColumn {
  @IsString()
  @ApiProperty({ example: 'Backlog' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: [Task] })
  @Prop({ default: [] })
  tasks: Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);
