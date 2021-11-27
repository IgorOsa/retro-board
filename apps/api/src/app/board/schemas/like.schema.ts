import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ILike } from '@retro-board/api-interfaces';

@Schema({
  versionKey: false,
})
export class Like implements ILike {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  taskId?: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  userId?: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
