import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';

@Injectable()
export class AppService {
  private isAuthEnabled: boolean;
  constructor(config: ConfigService) {
    
  }
  getHello(): string {
    return 'Hello World!';
  }
  getDogs(): string {
    return 'Hello my doggies';
  }
}
