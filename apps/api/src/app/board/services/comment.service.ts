import { Inject, Injectable } from '@nestjs/common';
import { IMessage } from '@retro-board/api-interfaces';
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

  async update(
    _id: string,
    payload: Partial<Comment>
  ): Promise<Comment | IMessage> {
    try {
      const res = await this.commentModel.findOneAndUpdate({ _id }, payload, {
        new: true,
      });
      if (!res) {
        throw new CustomBadRequestException(
          `No comment for update found with id ${_id}`
        );
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async remove(_id: string) {
    try {
      const res = await this.commentModel.findOneAndRemove({ _id });
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
