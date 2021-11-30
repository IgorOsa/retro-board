import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ITask } from '@retro-board/api-interfaces';

export type TaskDocument = Task & Document;

@Schema({
  versionKey: false,
})
export class Task implements ITask {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  _id: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop({ required: true })
  columnId: string;

  @ApiProperty({ example: 'Example task title' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 1 })
  @Prop({ required: true })
  order: number;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export const TaskCreateRequest = OmitType(Task, ['_id'] as const);

export class TaskCreateResponse extends Task {}

export const TaskUpdateRequest = PartialType(TaskCreateRequest);
