import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CutomerSchema } from '../customer/Schemas/customer.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CutomerSchema }])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }