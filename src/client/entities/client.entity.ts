import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

//@Schema({ timestamps: true })

@Schema()
@ObjectType()
export class Client extends Document {
  @Field(() => ID)
  id: string;

  @Prop({ required: true, trim: true })
  @Field({ description: 'Client name' })
  name: string;

  @Prop({ required: true, trim: true })
  @Field({ description: 'Client lastName' })
  lastName: string;

  @Prop({ required: true, trim: true })
  @Field({ description: 'Client Empresa' })
  empresa: string;

  @Prop({ required: true, trim: true, unique: true })
  @Field({ description: 'Client email' })
  email: string;

  @Prop({ trim: true })
  @Field({ nullable: true, description: 'Client phone' })
  phone?: string;

  @Field(() => String, { description: 'Created date of the record' })
  @Prop({ default: Date.now() })
  createdAt: Date;

  @Field((type) => User)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  vendedor: mongoose.Types.ObjectId;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
