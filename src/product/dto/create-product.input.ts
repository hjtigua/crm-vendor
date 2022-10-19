import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field({ description: 'Product Name' })
  name: string;

  // default graphQl number type is float
  @Field((type) => Int, { description: "Product's Stock" })
  stock: number;

  @Field({ description: "Product's Price" })
  price: number;
}
