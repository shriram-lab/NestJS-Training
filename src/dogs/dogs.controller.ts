import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('dogs')
export class DogsController {
    constructor(private readonly appService: AppService) { }

    @Get()
    getDogs(): string {
        return this.appService.getDogs();
    }

}
