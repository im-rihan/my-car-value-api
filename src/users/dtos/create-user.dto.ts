import { IsEmail, IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
