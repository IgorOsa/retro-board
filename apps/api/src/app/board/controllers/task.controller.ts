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
import { IMessage } from '@retro-board/api-interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { Comment } from '../schemas/comment.schema';
import { Like } from '../schemas/like.schema';
import {
  Task,
  TaskCreateRequest,
  TaskCreateResponse,
  TaskUpdateRequest,
  TaskWithCommentsAndLikes,
} from '../schemas/task.schema';
import { CommentService } from '../services/comment.service';
import { LikeService } from '../services/like.service';
import { TaskService } from '../services/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(
    private commentService: CommentService,
    private likeService: LikeService,
    private taskService: TaskService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  async get(@Param('id') id: string): Promise<Task | IMessage> {
    return await this.taskService.get(id);
  }

  @Get(':id/all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get task by id with comments and likes' })
  @ApiOkResponse({
    description: 'Task data.',
    type: TaskWithCommentsAndLikes,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getAll(
    @Param('id') id: string
  ): Promise<TaskWithCommentsAndLikes | IMessage> {
    return await this.taskService.getWithCommentsAndLikes(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  async update(
    @Param('id') id: string,
    @Body() payload: Task
  ): Promise<Task | IMessage> {
    const column = await this.taskService.update(id, payload);
    return column;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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

  @Get(':id/likes')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get likes for task by id' })
  @ApiCreatedResponse({
    description: 'Array of likes',
    type: [Like],
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'TaskId', type: Like })
  async getLikes(@Param('id') taskId: string) {
    const created = await this.likeService.getAll(taskId);
    return created;
  }

  @Get(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get comments for task by id' })
  @ApiOkResponse({
    description: 'Task comments.',
    type: Comment,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async addComment(@Param('id') taskId: string) {
    const comments = await this.commentService.get(taskId);
    return comments;
  }
}
