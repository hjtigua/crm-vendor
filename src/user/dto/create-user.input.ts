import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'Name of the user' })
  name: string;

  @Field({ description: 'Last-name of the user' })
  lastName: string;

  @Field({ description: 'Email of the user' })
  email: string;

  @Field({ description: 'Password of the user' })
  password: string;
}
