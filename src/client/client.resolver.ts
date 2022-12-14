import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  ID,
} from '@nestjs/graphql';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => Client)
  createClient(
    @Args('createClientInput')
    createClientInput: CreateClientInput,
    @Context('user') user: User,
  ) {
    return this.clientService.create(createClientInput, user);
  }

  @Query(() => [Client], { name: 'clients' })
  findAll() {
    return this.clientService.findAll();
  }

  @Query(() => [Client], { name: 'clientsBySeller' })
  getClientsBySeller(@Context('user') user: User): Promise<Client[]> {
    return this.clientService.getClientsBySeller(user);
  }

  @Query(() => Client, { name: 'client' })
  findOne(
    @Args('id', { type: () => ID })
    id: string,
    @Context('user') user: User,
  ): Promise<Client> {
    return this.clientService.findOne(id, user);
  }

  @Mutation(() => Client)
  updateClient(
    @Args('updateClientInput')
    updateClientInput: UpdateClientInput,
    @Context('user') user: User,
  ): Promise<Client> {
    return this.clientService.update(
      updateClientInput.id,
      updateClientInput,
      user,
    );
  }

  @Mutation(() => String)
  removeClient(@Args('id', { type: () => ID }) id: string): Promise<string> {
    return this.clientService.remove(id);
  }
}
