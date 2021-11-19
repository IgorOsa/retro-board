import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CreatedResponse } from '../../core/models/created.model';
import {
  Column,
  ColumnCreateRequest,
  ColumnDocument,
} from '../schemas/column.schema';

const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

@Injectable()
export class ColumnService {
  constructor(
    @Inject('COLUMN_MODEL') private readonly columnModel: Model<ColumnDocument>
  ) {}

  async create(column: ColumnCreateRequest): Promise<CreatedResponse> {
    try {
      const payload = JSON.parse(JSON.stringify(column));

      await this.columnModel.create(payload);
      return { message: 'Column created' };
    } catch (err) {
      if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
        throw new CustomBadRequestException('Column exists');
      }
      throw new CustomBadRequestException(err.messsage);
    }
  }

  async getAll(): Promise<Column[]> {
    try {
      const res = await this.columnModel.find({});
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  async get(id: string) {
    try {
      const res = await this.columnModel.findOne({ _id: id });
      return res || { message: 'No columns found with id provided.' };
    } catch (err) {
      throw new CustomBadRequestException();
    }
  }
}
