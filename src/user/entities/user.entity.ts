import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema() // importante agregar esto en mongo db sino no funciona error super raro
export class User extends Document {
  @Field(() => ID)
  id: string;

  @Field({ description: 'Name of the user' })
  @Prop({ required: true, trim: true })
  name: string;

  @Field({ description: 'Last-name of the user' })
  @Prop({ required: true, trim: true })
  lastName: string;

  @Field({ description: 'Email of the user' })
  @Prop({ required: true, trim: true, unique: true })
  email: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Field(() => String, { description: 'Created date of the record' })
  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
