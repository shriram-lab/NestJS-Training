import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from './config/config.module';
import { LoggerMiddleware } from "./logger.middleware";
import { AuthModule } from './auth/auth.module';
import { CustomerController } from './customer/customer.controller';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/customer-app', { useNewUrlParser: true, useUnifiedTopology: true }),
    CustomerModule,
    ConfigModule,
    AuthModule
  ],
  controllers: [AppController, DogsController, CustomerController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('dogs','customer')
  }

}
