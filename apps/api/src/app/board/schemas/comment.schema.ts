import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IComment } from '@retro-board/api-interfaces';

export type CommentDocument = Comment & Document;

@Schema({
  versionKey: false,
})
export class Comment implements IComment {
  _id: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  taskId: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  userId: string;

  @ApiProperty({ example: 'Comment example' })
  @Prop({ required: true })
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
