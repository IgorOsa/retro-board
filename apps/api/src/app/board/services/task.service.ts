import { Inject, Injectable } from '@nestjs/common';
import { IMessage } from '@retro-board/api-interfaces';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CommentDocument } from '../schemas/comment.schema';
import { LikeDocument } from '../schemas/like.schema';
import { Task, TaskCreateResponse, TaskDocument } from '../schemas/task.schema';

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

  async getAll(columnId: string): Promise<Task[]> {
    try {
      const res = await this.taskModel.find({ columnId });
      if (!res) {
        throw new CustomBadRequestException(
          `No tasks found for column with id ${columnId}`
        );
      }
      return res;
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
      return res;
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
