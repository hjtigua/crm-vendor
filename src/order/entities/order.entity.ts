import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import { OrderState } from '../dto/create-order.input';

@ObjectType()
@Schema()
class OrderDetail {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  quantity: number;
}

@Schema()
@ObjectType()
export class Order extends Document {
  @Field(() => ID)
  id: string;

  @Field(() => [OrderDetail])
  @Prop({ required: true })
  orders: OrderDetail[];

  @Field(() => Float)
  @Prop({ required: true })
  total: number;

  @Field(() => Client)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'Client' })
  client: mongoose.Types.ObjectId;

  @Field(() => User)
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  seller: mongoose.Types.ObjectId;

  @Field(() => OrderState)
  @Prop({ default: OrderState.PENDING })
  status: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
