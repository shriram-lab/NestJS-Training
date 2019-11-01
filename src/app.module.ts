import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerModule } from './customer/customer.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/customer-app', { useNewUrlParser: true }),
    CustomerModule
  ],
  controllers: [AppController, DogsController],
  providers: [AppService],
})
export class AppModule { }
