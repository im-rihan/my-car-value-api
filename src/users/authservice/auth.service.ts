import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //   See if email in use
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('Email Already In use');
    }

    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hash result and salt together
    const result = salt + '.' + hash.toString('hex');
    // Create the new user using email and password
    const user = await this.usersService.create(email, result);
    // Return User
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    const [salt, storedPass] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedPass !== hash.toString('hex')) {
      throw new BadRequestException('Please type valid password');
    } else {
      return user;
    }
  }
}
