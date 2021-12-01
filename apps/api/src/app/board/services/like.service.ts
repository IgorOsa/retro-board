import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { Like, LikeDocument } from '../schemas/like.schema';

@Injectable()
export class LikeService {
  constructor(
    @Inject('LIKE_MODEL') private readonly likeModel: Model<LikeDocument>
  ) {}

  async create(payload: Like) {
    try {
      const res = await this.likeModel.create(payload);
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async remove(payload: Like) {
    try {
      const res = await this.likeModel.findOneAndRemove(payload);
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async getAll(taskId: string) {
    try {
      const res = await this.likeModel.find({ taskId });
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
