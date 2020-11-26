import { IsString, IsNotEmpty } from "class-validator";

export class CreateMessageDto {
  sender_id?: string

  receiver_id?: string

  @IsNotEmpty()
  @IsString()
  body: string
}

export class CreateMessageToTalkDto {
  message_id?: string

  talk_id?: string
}