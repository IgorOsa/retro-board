import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CreatedResponse } from '../../core/models/created.model';
import { Task, TaskDocument } from '../schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_MODEL') private readonly taskModel: Model<TaskDocument>
  ) {}

  async create(task: Task): Promise<CreatedResponse> {
    try {
      await this.taskModel.create(task);
      return { message: 'Task created.' };
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async getAll(columnId: string): Promise<Task[]> {
    try {
      const res = await this.taskModel.find({ columnId });
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async get(id: string): Promise<Task> {
    try {
      const res = await this.taskModel.findOne({ _id: id });
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
