import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IMessage } from '@retro-board/api-interfaces';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CreatedResponse } from '../../core/models/created.model';
import { Column, ColumnCreateRequest } from '../schemas/column.schema';
import { ColumnService } from '../services/column.service';

@ApiTags('column')
@Controller('column')
export class ColumnController {
  constructor(private columnService: ColumnService) {}

  @Post()
  @ApiOperation({ summary: 'Create column' })
  @ApiCreatedResponse({
    description: 'Column successfully created.',
    type: CreatedResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Create column', type: ColumnCreateRequest })
  async create(@Body() column: Column): Promise<IMessage> {
    const created = await this.columnService.create(column);
    return created;
  }

  @Get()
  @ApiOperation({ summary: 'Get columns' })
  @ApiOkResponse({
    description: 'Columns list',
    type: [Column],
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAll(): Promise<[Column]> {
    const columns = await this.columnService.getAll();
    return columns;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get column by id' })
  @ApiOkResponse({
    description: 'Column data.',
    type: Column,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async get(@Param('id') id: string) {
    const column = await this.columnService.get(id);
    return column;
  }
}
