import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderInput, OrderProductInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';
import { ClientService } from 'src/client/client.service';
import { User } from 'src/user/entities/user.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
    private readonly clientService: ClientService,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderInput: CreateOrderInput, user: User): Promise<Order> {
    const { client: clientID } = createOrderInput;
    const actualClient = await this.clientService.findOne(clientID, user);

    if (actualClient.vendedor.toString() !== user.id)
      throw new Error('El cliente no pertenece al vendedor');

    const { orders } = createOrderInput;

    const IDS: string[] = [];
    const mappedOrders = new Map<string, OrderProductInput>();

    for (const order of orders) {
      const { id } = order;
      IDS.push(id);
      mappedOrders.set(id, order);
    }

    const products = await this.productService.findAllById(IDS);

    for (const product of products) {
      const order = mappedOrders.get(product.id);
      if (order.quantity > product.stock)
        throw new Error(`Product ${product.name} does not has stock`);
      product.stock = product.stock - order.quantity;
      await product.save();
    }

    const order = new this.orderModel(createOrderInput);
    order.seller = new Types.ObjectId(user.id);
    const finishedOrder = await order.save();
    return finishedOrder;
  }

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find({}).populate('client').populate('seller');
  }

  async findAllOrdersBySeller(user: User): Promise<Order[]> {
    const { id } = user;
    return await this.orderModel
      .find({ seller: id })
      .populate('client')
      .populate('seller');
  }

  async findOne(id: string, user: User): Promise<Order> {
    const order = await this.orderModel.findById(id);
    if (!order) throw new Error('Order not found');
    if (order.seller.toString() !== user.id) throw new Error('Order not found');
    return order.populate(['client', 'seller']);
  }

  update(id: number, updateOrderInput: UpdateOrderInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
