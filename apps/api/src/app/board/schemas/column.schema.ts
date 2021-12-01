import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  Prop,
  Schema as MongooseSchema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { IsString } from 'class-validator';

import { IColumn } from '@retro-board/api-interfaces';
import { Task } from './task.schema';

export type ColumnDocument = Column & Document;

@MongooseSchema({
  versionKey: false,
})
export class Column implements IColumn {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  _id: string;

  @IsString()
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop({ required: true })
  boardId: string;

  @IsString()
  @ApiProperty({ example: 'Backlog' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: '2021-11-18T15:31:49.451Z' })
  @Prop({ default: Date.now })
  created?: Date;

  tasks: Task[];
}

export const ColumnSchema = SchemaFactory.createForClass(Column);

export class ColumnCreateRequest extends OmitType(Column, [
  '_id',
  'tasks',
  'created',
] as const) {}

export class ColumnCreateResponse extends Column {}
