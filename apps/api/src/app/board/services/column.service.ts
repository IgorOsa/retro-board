import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import {
  Column,
  ColumnCreateRequest,
  ColumnCreateResponse,
  ColumnDocument,
} from '../schemas/column.schema';
import { CommentDocument } from '../schemas/comment.schema';
import { LikeDocument } from '../schemas/like.schema';
import { TaskDocument } from '../schemas/task.schema';

@Injectable()
export class ColumnService {
  constructor(
    @Inject('COLUMN_MODEL') private readonly columnModel: Model<ColumnDocument>,
    @Inject('TASK_MODEL') private readonly taskModel: Model<TaskDocument>,
    @Inject('LIKE_MODEL') private readonly likeModel: Model<LikeDocument>,
    @Inject('COMMENT_MODEL')
    private readonly commentModel: Model<CommentDocument>
  ) {}

  async create(column: ColumnCreateRequest): Promise<ColumnCreateResponse> {
    try {
      const payload = JSON.parse(JSON.stringify(column));
      return await this.columnModel.create(payload);
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async getAll(): Promise<Column[]> {
    try {
      const res = await this.columnModel.find({});
      if (!res) {
        throw new CustomBadRequestException(`No columns found`);
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async get(_id: string) {
    try {
      const res = await this.columnModel.findOne({ _id });
      if (!res) {
        throw new CustomBadRequestException(`No columns with id ${_id} found`);
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async remove(_id: string) {
    try {
      const tasks = await this.taskModel.find({ columnId: _id });
      if (tasks) {
        tasks.map(async (t) => {
          await this.likeModel.deleteMany({ taskId: t._id });
          await this.commentModel.deleteMany({ taskId: t._id });
        });
        const tasksToBeDeleted = tasks.reduce((acc, el) => {
          acc.push(el._id);
          return acc;
        }, []);
        await this.taskModel.deleteMany({ _id: { $in: tasksToBeDeleted } });
      }
      const res = await this.columnModel.findOneAndDelete({ _id });
      if (!res) {
        throw new CustomBadRequestException(`No column found with id ${_id}`);
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
