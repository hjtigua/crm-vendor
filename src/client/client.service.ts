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

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientInput: UpdateClientInput) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
