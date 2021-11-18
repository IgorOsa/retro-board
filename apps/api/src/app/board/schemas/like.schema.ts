import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ILikes } from '@retro-board/api-interfaces';

@Schema({
  versionKey: false,
})
export class Likes implements ILikes {
  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  taskId?: string;

  @ApiProperty({ example: '619671f9f302700e286b94df' })
  @Prop()
  userId?: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Likes);
