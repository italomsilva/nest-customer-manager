import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { CustomerService } from "src/service/customerService";

@Controller('customer')
export class CustomerController{
    constructor(@Inject()private customerService:CustomerService){}

    @Get('all')
    async findAllCustomers():Promise<any>{
        return await this.customerService.findAllCustomers();
    }

    @Get()
    async findCustomers(@Query('page') page:number, @Query('limit') limit:number):Promise<any>{
        return await this.customerService.findCustomers(page, limit);
    }

    @Get('/:customerNumber')
    async findByCustomerNumber(@Param() params):Promise<any>{
        const result = await this.customerService.findByCustomerNumber(parseInt(params.customerNumber, 10));
        return result;
    }

    @Post('create')
    async createCustomer(@Body() body):Promise<any>{
        const result = await this.customerService.createCustomer(body)
        return result;
    }

    @Put('update')
    async updateCustomer(@Body() body):Promise<any>{
        const result = await this.customerService.updateCustomer(body)
        return result;
    }

    @Delete('/:customerNumber/delete')
    async deleteCustomer(@Param() param, @Body() body):Promise<any>{
        const result = await this.customerService.deleteCustomer(parseInt(param.customerNumber, 10), body);
        return result;
    }
}