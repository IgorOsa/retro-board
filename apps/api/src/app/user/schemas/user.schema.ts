import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashPassword } from '../../auth/auth.helpers';

import { IUser } from '@retro-board/api-interfaces';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
})
export class User implements IUser {
  @ApiProperty()
  _id: string;

  @ApiProperty({
    example: 'John',
    description: `User's First Name`,
  })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({
    example: 'Dow',
    description: `User's Last Name`,
  })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: `User's email`,
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: 'password',
    description: `User's password`,
  })
  @Prop({ required: true })
  password: string;

  toResponse: () => User | PromiseLike<User>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function (next) {
  this.password = await hashPassword(this.password);
  next();
});

UserSchema.method('toResponse', function (this: any): User | PromiseLike<User> {
  const { _id, ...rest } = this.toJSON();
  if (rest.password) {
    delete rest.password;
  }
  return { _id, ...rest };
});

export class UserRequest extends OmitType(User, ['_id'] as const) {}

export class UserResponse extends OmitType(User, ['password'] as const) {}
