import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
import {
  Task,
  TaskCreateRequest,
  TaskCreateResponse,
  TaskUpdateRequest,
} from '../schemas/task.schema';
import { TaskService } from '../services/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create task in column with provided id' })
  @ApiCreatedResponse({
    description: 'Task successfully created.',
    type: TaskCreateResponse,
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
  async createTask(@Body() task: Task): Promise<TaskCreateResponse> {
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

  @Put(':id')
  @ApiOperation({ summary: 'Update task by id.' })
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
  @ApiBody({ description: 'Update task', type: TaskUpdateRequest })
  async update(@Param('id') id: string, @Body() payload: Task) {
    const column = await this.taskService.update(id, payload);
    return column;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove task by id.' })
  @ApiOkResponse({ description: 'Task removed successfully.' })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async remove(@Param('id') id: string) {
    return await this.taskService.remove(id);
  }
}
