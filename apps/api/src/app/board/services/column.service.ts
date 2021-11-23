import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import {
  Column,
  ColumnCreateRequest,
  ColumnCreateResponse,
  ColumnDocument,
} from '../schemas/column.schema';

@Injectable()
export class ColumnService {
  constructor(
    @Inject('COLUMN_MODEL') private readonly columnModel: Model<ColumnDocument>
  ) {}

  async create(column: ColumnCreateRequest): Promise<ColumnCreateResponse> {
    try {
      const payload = JSON.parse(JSON.stringify(column));
      return await this.columnModel.create(payload);
    } catch (err) {
      throw new CustomBadRequestException(err.messsage);
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
}
