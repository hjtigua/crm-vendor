import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { ClientModule } from './client/client.module';
import { verify } from 'jsonwebtoken';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }: any) => {
        const token: string = req.headers['authorization'] || '';
        // if (!token) throw new Error('No token provided');
        if (token) {
          try {
            const user = verify(token, process.env.JWT_SECRET);
            return {
              user,
            };
          } catch (error) {
            throw new Error('Invalid token');
          }
        }
      },
    }),
    CoursesModule,
    UserModule,
    ProductModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    // console.log(process.env.MONGO_DB_URI);
  }
}
