import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IComments } from '@retro-board/api-interfaces';

@Schema({
  versionKey: false,
})
export class Comments implements IComments {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  taskId?: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  userId?: string;

  @ApiProperty({ example: 'Comment example' })
  @Prop({ required: true })
  text: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
