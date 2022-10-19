import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<Client>,
  ) {}

  async create(createClientInput: CreateClientInput, seller: User) {
    const { email } = createClientInput;
    const client = await this.clientModel.findOne({ email });
    if (client) throw new Error('Client already exists');

    const newClient = new this.clientModel(createClientInput);
    const sellerID = new mongoose.Types.ObjectId(seller.id);
    newClient.vendedor = sellerID;

    try {
      const clientCreated: Client = await newClient.save();
      return clientCreated;
    } catch (error) {
      throw new Error('Error creating client');
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      const clients = await this.clientModel.find({});
      return clients;
    } catch (error) {
      console.log(error);
    }
  }

  async getClientsBySeller(user: User): Promise<Client[]> {
    const sellerID = new mongoose.Types.ObjectId(user.id);
    const clients = await this.clientModel.find({ vendedor: sellerID });
    return clients;
  }

  async findOne(id: string, user: User): Promise<Client> {
    const client: Client = await this.clientModel.findById(id);

    if (!client) throw new Error('Client not found');

    if (client.vendedor.toString() !== user.id) throw new Error('Not Allowed');
    return client;
  }

  async update(
    id: string,
    updateClientInput: UpdateClientInput,
    user: User,
  ): Promise<Client> {
    const updatedClient = await this.clientModel.findByIdAndUpdate(
      id,
      updateClientInput,
      { new: true },
    );
    if (!updatedClient) throw new Error('Client not found');
    return updatedClient;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
