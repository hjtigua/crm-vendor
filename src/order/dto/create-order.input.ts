import {
  InputType,
  Int,
  Field,
  ID,
  Float,
  registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class OrderProductInput {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  quantity: number;
}

export enum OrderState {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

registerEnumType(OrderState, {
  name: 'OrderState',
});

@InputType()
export class CreateOrderInput {
  @Field(() => [OrderProductInput])
  orders: OrderProductInput[];

  @Field(() => Float)
  total: number;

  @Field(() => ID)
  client: string;

  @Field(() => OrderState)
  state: OrderState;
}
