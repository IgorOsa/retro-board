import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CustomBadRequestException extends BadRequestException {
  constructor(message = 'Bad request') {
    super(message);
  }
  @ApiProperty({ example: 400 })
  statusCode: number;
  @ApiProperty({ example: 'Entity exists' })
  message: string;
  @ApiProperty({ example: 'Bad Request' })
  error: string;
}
