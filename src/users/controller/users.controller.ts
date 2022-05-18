import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../service/users.service';
import { UpdateUserDto } from './../dtos/update-user.dto';
import { Serialize } from './../../interceptors/serialize.interceptor';
import { UserDto } from './../dtos/user.dto';
import { AuthService } from './../authservice/auth.service';
import { UserEntity } from '../entity/user.entity';
import { CurrentUser } from '../decorator/current-user.decorator';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) { }

  @Post('signup')
  async signUp(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @UseGuards(AuthGuard)
  @Get('currentuser')
  currentUser(@CurrentUser() user: UserEntity) {
    return user;
  }

  // @Get('/whoami')
  // whoAmI(@CurrentUser() user: string) {
  //   return user;
  // }

  @Post('signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('signout')
  signOut(@Session() session: any) {
    return (session.userId = null);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    // console.log('handler is running');
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
