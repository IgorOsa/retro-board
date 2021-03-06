import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Param,
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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRequest, UserResponse } from './schemas/user.schema';
import { CustomBadRequestException } from '../core/exceptions/badrequest.exception';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User successfully created.',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Create user', type: UserRequest })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser.toResponse();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user info' })
  @ApiOkResponse({
    description: `Current user's info.`,
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async findOne(@Request() req): Promise<User> {
    const user = await this.userService.findOne({
      _id: req.user.userId,
      email: req.user.username,
    });
    return user.toResponse();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    description: `Get user by id`,
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async getUserById(@Param('id') userId: string): Promise<User> {
    const user = await this.userService.findOne({
      _id: userId,
    });
    return user.toResponse();
  }
}
