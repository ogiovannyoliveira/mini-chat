import { IsString, IsNotEmpty } from "class-validator";

export class CreateMessageDto {
  sender_id?: string

  @IsNotEmpty()
  @IsString()
  body: string
}