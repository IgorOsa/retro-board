import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IComments, ILikes, ITask } from '@retro-board/api-interfaces';
import { Likes } from './like.schema';
import { Comments } from './comments.schema';

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
  @Prop()
  likes?: Likes[];

  @ApiProperty({ type: [Comments], default: [] })
  @Prop()
  comments?: Comments[];
}

export const ColumnSchema = SchemaFactory.createForClass(Task);
