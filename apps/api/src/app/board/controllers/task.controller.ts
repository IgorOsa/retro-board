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
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { CreatedResponse } from '../../core/models/created.model';
import { Task, TaskCreateRequest } from '../schemas/task.schema';
import { TaskService } from '../services/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create task in column with provided id' })
  @ApiCreatedResponse({
    description: 'Task successfully created.',
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
  @ApiBody({ description: 'Create task', type: TaskCreateRequest })
  async createTask(@Body() task: Task): Promise<CreatedResponse> {
    const created = await this.taskService.create(task);
    return created;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  @ApiOkResponse({
    description: 'Task data.',
    type: Task,
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
    const column = await this.taskService.get(id);
    return column;
  }
}
