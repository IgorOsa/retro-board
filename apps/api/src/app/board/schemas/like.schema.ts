import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { ILikes } from '@retro-board/api-interfaces';

@Schema({
  versionKey: false,
})
export class Likes implements ILikes {
  @ApiProperty()
  @Prop()
  taskId?: string;

  @ApiProperty()
  @Prop()
  userId?: string;
}

export const ColumnSchema = SchemaFactory.createForClass(Likes);
