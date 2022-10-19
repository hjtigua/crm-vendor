import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClientInput {
  @Field({ description: 'Client name' })
  name: string;

  @Field({ description: 'Client lastName' })
  lastName: string;

  @Field({ description: 'Client Empresa' })
  empresa: string;

  @Field({ description: 'Client email' })
  email: string;

  @Field({ nullable: true, description: 'Client phone' })
  phone?: string;
}
