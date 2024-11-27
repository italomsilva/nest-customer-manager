import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/model/customer';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: Model<Customer>,
  ) {}

  async findAllCustomers(): Promise<Customer[]> {
    return await this.customerModel.find();
  }

  async findByCustomerNumber(customerNumber: number): Promise<Customer> {
    return await this.customerModel.findOne({ customerNumber: customerNumber });
  }

  async findCustomers(page:number, limit:number){
    const skip = (page-1)*limit;
    const customers = await this.customerModel.find().skip(skip).limit(limit).exec();
    const countTotal = await this.customerModel.countDocuments();
    return {
        customers,
        currentPage: page,
        totalPages: Math.ceil(countTotal/limit),
        totalItems: countTotal
    }
  }

  async createCustomer(input: CreateCustomerInput): Promise<Customer> {
    const newCustomer = new this.customerModel(input);
    return newCustomer.save();
  }

  async updateCustomer(input: CreateCustomerInput): Promise<BooleanOutput> {
    if (!input.customerNumber)
      throw new BadRequestException('Custome Number is required');
    const customer = await this.findByCustomerNumber(input.customerNumber);
    if (!customer) throw new NotFoundException('Customer not found');

    try {
      await this.customerModel.updateOne(customer, input);
      return { sucess: true };
    } catch (error) {
      return { sucess: false, message: error };
    }
  }

  async deleteCustomer(paramCustomerNumber: number, bodyCustomer: Customer) {
    if (paramCustomerNumber != bodyCustomer.customerNumber)
      throw new UnauthorizedException();
    const customerParam = await this.findByCustomerNumber(paramCustomerNumber);

    if (!customerParam) throw new NotFoundException('Customer not found');
    const isEqual =
      customerParam.name == bodyCustomer.name ||
      customerParam.address == bodyCustomer.address ||
      customerParam.birthDate == bodyCustomer.birthDate ||
      customerParam.email == bodyCustomer.email ||
      customerParam.level == bodyCustomer.level ||
      customerParam.phone == bodyCustomer.phone ||
      customerParam.purchaseCount == bodyCustomer.purchaseCount;

    if (!isEqual) throw new UnauthorizedException();

    try {
      await this.customerModel.deleteOne({
        customerNumber: bodyCustomer.customerNumber,
      });
      return { sucess: true };
    } catch (error) {
      return { sucess: false, message: error };
    }
  }
}

type CreateCustomerInput = {
  customerNumber?: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  birthDate: Date;
  level: number;
  purchaseCount: number;
};

type BooleanOutput = {
  sucess: boolean;
  message?: string;
};
