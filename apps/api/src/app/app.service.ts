import { Injectable } from '@nestjs/common';
import { Message } from '@retro-board/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'RetroBoard' };
  }
}
