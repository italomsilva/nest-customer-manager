import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './model/customer';
import { CustomerController } from './controller/customerController';
import { CustomerService } from './service/customerService';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class AppModule {}
