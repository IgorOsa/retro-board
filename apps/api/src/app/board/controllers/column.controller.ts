import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IMessage } from '@retro-board/api-interfaces';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CreatedResponse } from '../../core/models/created.model';
import { Column } from '../schemas/column.schema';
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
  @ApiBody({ description: 'Create column', type: Column })
  async create(@Body() column: Column): Promise<IMessage> {
    const created = await this.columnService.create(column);
    return created;
  }
}
