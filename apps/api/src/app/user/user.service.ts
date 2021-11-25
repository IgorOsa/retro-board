import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../core/exceptions/badrequest.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(user);
    } catch (err) {
      if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
        throw new CustomBadRequestException('User exists');
      }
      throw new CustomBadRequestException();
    }
  }

  async find(payload = {}): Promise<User[]> {
    return this.userModel.find(payload).exec();
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userModel.findOne({ id }).exec();
  }
}
