import { ApiProperty } from '@nestjs/swagger';

import { IMessage } from '@retro-board/api-interfaces';

export class CreatedResponse implements IMessage {
  @ApiProperty({ example: 'Column successfully created.' })
  message: string;
}
