import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IComments } from '@retro-board/api-interfaces';

@Schema({
  versionKey: false,
})
export class Comments implements IComments {
  @ApiProperty()
  @Prop()
  taskId?: string;

  @ApiProperty()
  @Prop()
  userId?: string;

  @ApiProperty()
  @Prop({ required: true })
  text: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
