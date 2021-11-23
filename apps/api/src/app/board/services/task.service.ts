import { Inject, Injectable } from '@nestjs/common';
import { IMessage } from '@retro-board/api-interfaces';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { Task, TaskCreateResponse, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_MODEL') private readonly taskModel: Model<TaskDocument>
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
}
