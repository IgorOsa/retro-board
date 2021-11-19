import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ITask } from '@retro-board/api-interfaces';
import { Likes, LikeSchema } from './like.schema';
import { Comments, CommentSchema } from './comments.schema';

@Schema({
  versionKey: false,
})
export class Task implements ITask {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  id?: string;

  @ApiProperty({ example: 'Example task title' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: [Likes], default: [] })
  @Prop({ type: [LikeSchema] })
  likes?: Likes[];

  @ApiProperty({ type: [Comments], default: [] })
  @Prop({ type: [CommentSchema] })
  comments?: Comments[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
