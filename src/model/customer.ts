import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
export enum CustomerLevel {
    Bronze = 0,
    Silver = 1,
    Gold = 2,
    Diamond = 3,
  }
  
export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
  @Prop({
    unique: true,
    primary: true,
  })
  customerNumber: number;  

  @Prop({ required: true })
  name: string;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  address?: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({
    required: true,
    type: Number,
  })
  level: Number;

  @Prop({ default: 0 })
  purchaseCount: number;  
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.pre<CustomerDocument>('save', async function (next) {
    const model = this.constructor as Model<CustomerDocument>;
    
    if (!this.customerNumber) {
      const lastCustomer = await model.findOne({}, { customerNumber: 1 }).sort({ customerNumber: -1 });
      this.customerNumber = lastCustomer ? lastCustomer.customerNumber + 1 : 1; 
    }
  
    next();
  });
