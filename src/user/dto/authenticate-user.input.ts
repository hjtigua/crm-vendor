import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthenticateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
