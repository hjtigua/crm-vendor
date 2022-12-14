import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = new this.productModel(createProductInput);
    return await product.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find({}).exec();
    return products;
  }

  async findAllById(ids: string[]): Promise<Product[]> {
    const products = await this.productModel.find({ id: { $in: ids } });
    return products;
  }

  async findOne(id: string): Promise<Product> {
    if (!isValidObjectId(id)) throw new Error('Invalid Product Id');

    const product = await this.productModel.findById(id).exec();
    if (!product) throw new Error('Product not found');

    return product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    if (!isValidObjectId(id)) throw new Error('Invalid Product Id');
    const product = await this.productModel
      .findByIdAndUpdate(id, updateProductInput, { new: true })
      .exec();

    if (!product) throw new Error('Product not found');
    return product;
  }

  async remove(id: string): Promise<string> {
    if (!isValidObjectId(id)) throw new Error('Invalid Product Id');
    const product = await this.productModel.findByIdAndRemove(id).exec();
    if (!product) throw new Error('Product not found');
    return 'Product deleted successfully';
  }
}
