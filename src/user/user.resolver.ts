import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthenticateUserInput } from './dto/authenticate-user.input';
import { UserToken } from './dto/user-token.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => UserToken)
  authenticateUser(
    @Args('input') authenticateUserInput: AuthenticateUserInput,
  ) {
    return this.userService.authenticateUser(authenticateUserInput);
  }

  @Query(() => User, { name: 'userLogin' })
  userLogin(@Args('token', { type: () => String }) token: string) {
    return this.userService.userLogin(token);
  }
}
