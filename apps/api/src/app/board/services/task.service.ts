import { Inject, Injectable } from '@nestjs/common';
import {
  IMessage,
  ITaskWithCommentsAndLikes,
} from '@retro-board/api-interfaces';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CommentDocument } from '../schemas/comment.schema';
import { LikeDocument } from '../schemas/like.schema';
import {
  Task,
  TaskCreateResponse,
  TaskDocument,
  TaskWithCommentsAndLikes,
} from '../schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_MODEL') private readonly taskModel: Model<TaskDocument>,
    @Inject('LIKE_MODEL') private readonly likeModel: Model<LikeDocument>,
    @Inject('COMMENT_MODEL')
    private readonly commentModel: Model<CommentDocument>
  ) {}

  async create(task: Task): Promise<TaskCreateResponse> {
    try {
      return await this.taskModel.create(task);
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async getAll(columnId: string): Promise<ITaskWithCommentsAndLikes[]> {
    try {
      const res = await this.taskModel.find({ columnId });
      if (!res) {
        throw new CustomBadRequestException(
          `No tasks found for column with id ${columnId}`
        );
      } else {
        const column = [...JSON.parse(JSON.stringify(res))];
        return column.reduce(async (acc, el) => {
          const res = await acc;
          const comments = await this.commentModel.find({ taskId: el._id });
          const likes = await this.likeModel.find({ taskId: el._id });
          return res.concat({ ...el, comments, likes });
        }, Promise.resolve([]));
      }
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async get(_id: string): Promise<Task | IMessage> {
    try {
      const res = await this.taskModel.findOne({ _id });
      if (!res) {
        throw new CustomBadRequestException(`No task found with id ${_id}`);
      }
      return { ...JSON.parse(JSON.stringify(res)) };
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async getWithCommentsAndLikes(
    _id: string
  ): Promise<TaskWithCommentsAndLikes | IMessage> {
    try {
      const res = await this.taskModel.findOne({ _id });
      if (!res) {
        throw new CustomBadRequestException(`No task found with id ${_id}`);
      }
      const comments = await this.commentModel.find({ taskId: res._id });
      const likes = await this.likeModel.find({ taskId: res._id });
      return { ...JSON.parse(JSON.stringify(res)), comments, likes };
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async update(_id: string, payload: Task): Promise<Task | IMessage> {
    try {
      const res = await this.taskModel.findOneAndUpdate({ _id }, payload, {
        new: true,
      });
      if (!res) {
        throw new CustomBadRequestException(
          `No task for update found with id ${_id}`
        );
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async remove(_id: string) {
    try {
      await this.likeModel.deleteMany({ taskId: _id });
      await this.commentModel.deleteMany({ taskId: _id });
      const res = await this.taskModel.findOneAndDelete({ _id });
      if (!res) {
        throw new CustomBadRequestException(`No task found with id ${_id}`);
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
