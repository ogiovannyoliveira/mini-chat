import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nickname: string
  
  @IsNotEmpty()
  @IsString()
  password: string
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  nickname: string
  
  @IsNotEmpty()
  @IsString()
  password: string
}