import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Product extends Document {
  @Field({ description: 'Product Id' })
  id: string;

  @Prop({ required: true, trim: true })
  @Field({ description: 'Product Name' })
  name: string;

  @Prop({ required: true })
  @Field({ description: "Product's Stock" })
  stock: number;

  @Prop({ required: true, trim: true })
  @Field({ description: "Product's Price" })
  price: number;

  @Field(() => String, { description: 'Created date of the record' })
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
