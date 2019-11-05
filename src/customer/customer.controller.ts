import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, UseFilters, ForbiddenException, UsePipes, UseGuards, Req } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ValidationPipe } from "../validation.pipe";
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';


@Controller('customer')
@UseFilters(new HttpExceptionFilter())
export class CustomerController {
    constructor(private customerService: CustomerService, private readonly authService: AuthService) { }

    // add a customer
    @Post('/create')
    @UsePipes(new ValidationPipe())
    async addCustomer(@Res() res, @Body() createCustomerDTO: CreateCustomerDto) {
        const customer = await this.customerService.addCustomer(createCustomerDTO);
        return res.status(HttpStatus.OK).json({
            message: "Customer has been created successfully",
            customer
        })
        
    }

    // Retrieve customers list
    @UseGuards(AuthGuard('jwt'))
    @Get('customers')
    async getAllCustomer(@Res() res) {
        const customers = await this.customerService.getAllCustomer();
        if(customers.length > 0){
            return res.status(HttpStatus.OK).json(customers);
        }else{
            throw new NotFoundException();
        }
    }

    // Fetch a particular customer using ID
    @Get('customer/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.customerService.getCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json(customer);
    }
     // Update a customer's details
     @Put('/update')
     async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() createCustomerDTO: CreateCustomerDto) {
         const customer = await this.customerService.updateCustomer(customerID, createCustomerDTO);
         if (!customer) throw new NotFoundException('Customer does not exist!');
         return res.status(HttpStatus.OK).json({
             message: 'Customer has been successfully updated',
             customer
         });
     }
 
     // Delete a customer
     @Delete('/delete')
     async deleteCustomer(@Res() res, @Query('customerID') customerID) {
         const customer = await this.customerService.deleteCustomer(customerID);
         if (!customer) throw new NotFoundException('Customer does not exist');
         return res.status(HttpStatus.OK).json({
             message: 'Customer has been deleted',
             customer
         })
     }

    //  jwt authorization
    //@UseGuards(AuthGuard('local'))
    @Post('auth/login')
    @UsePipes(new ValidationPipe())
    async loginCustomer(@Req() req) {
        return this.authService.login(req.body.email);
    }
}