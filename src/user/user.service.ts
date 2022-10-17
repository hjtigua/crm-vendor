import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthenticateUserInput } from './dto/authenticate-user.input';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { UserToken } from './dto/user-token.type';

@Injectable()
export class UserService {
  private jwtSecret: string = this.configService.getOrThrow('JWT_SECRET');

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private configService: ConfigService,
  ) {}

  async authenticateUser(authenticateUserInput: AuthenticateUserInput) {
    const { email, password } = authenticateUserInput;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Password is incorrect');
    const token: string = this.createUserToken(user);
    const userToken: UserToken = {
      token,
    };
    return userToken;
  }

  async create(createUserInput: CreateUserInput) {
    const { email, password, name, lastName } = createUserInput;

    const existUser = await this.userModel.findOne({ email });
    if (existUser)
      throw new Error('User already exist with this email address');

    try {
      const salt = await bcrypt.genSalt(10);

      const user = new this.userModel();
      user.email = email;
      user.password = await bcrypt.hash(password, salt);
      user.name = name;
      user.lastName = lastName;

      await user.save();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  private createUserToken(user: User): string {
    const { id, email, name } = user;
    return sign({ id, email, name }, this.jwtSecret, { expiresIn: '1d' });
  }

  userLogin(token: string): string | JwtPayload {
    const userPayload = verify(token, this.jwtSecret);
    return userPayload;
  }
}
