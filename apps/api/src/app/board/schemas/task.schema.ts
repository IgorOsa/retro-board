import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IComments, ILikes, ITask } from '@retro-board/api-interfaces';
import { Likes } from './like.schema';
import { Comments } from './comments.schema';

@Schema({
  versionKey: false,
})
export class Task implements ITask {
  @ApiProperty()
  @Prop()
  id?: string;

  @ApiProperty()
  @Prop({ required: true })
  title: string;

  @ApiProperty({ type: [Likes] })
  @Prop()
  likes?: Likes[];

  @ApiProperty({ type: [Comments] })
  @Prop()
  comments?: Comments[];
}

export const ColumnSchema = SchemaFactory.createForClass(Task);
