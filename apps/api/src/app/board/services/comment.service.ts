import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { Comment, CommentDocument } from '../schemas/comment.schema';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_MODEL')
    private readonly commentModel: Model<CommentDocument>
  ) {}

  async create(payload: Comment) {
    try {
      const res = await this.commentModel.create(payload);
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async get(taskId: string) {
    try {
      const res = await this.commentModel.find({ taskId });
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async remove(payload: Comment) {
    try {
      const res = await this.commentModel.findOneAndRemove(payload);
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
