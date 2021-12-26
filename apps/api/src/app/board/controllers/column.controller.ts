import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IColumn } from '@retro-board/api-interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import {
  Column,
  ColumnCreateRequest,
  ColumnCreateResponse,
} from '../schemas/column.schema';
import { Task } from '../schemas/task.schema';
import { ColumnService } from '../services/column.service';
import { TaskService } from '../services/task.service';

@ApiTags('column')
@Controller('column')
export class ColumnController {
  constructor(
    private columnService: ColumnService,
    private taskService: TaskService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create column' })
  @ApiCreatedResponse({
    description: 'Column successfully created.',
    type: ColumnCreateResponse,
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
  async create(
    @Body() column: ColumnCreateRequest
  ): Promise<ColumnCreateResponse> {
    const created = await this.columnService.create(column);
    return created;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  async getAll(): Promise<Column[]> {
    const columns = await this.columnService.getAll();
    return columns;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update column by id' })
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
  async update(@Param('id') id: string, @Body() payload: IColumn) {
    const column = await this.columnService.update(id, payload);
    return column;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove column by id' })
  @ApiOkResponse({ description: 'Column removed successfully' })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async remove(@Param('id') id: string) {
    return await this.columnService.remove(id);
  }

  @Get(':columnId/tasks')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get tasks for column with id' })
  @ApiOkResponse({ description: 'Task list for column id', type: Task })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getTasks(@Param('columnId') columnId: string): Promise<Task[]> {
    const columns = await this.taskService.getAll(columnId);
    return columns;
  }
}
