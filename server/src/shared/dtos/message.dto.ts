import { IsString, IsNotEmpty, IsUUID } from "class-validator";

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

export class CreateMessageToGroupDto {
  message_id?: string

  @IsNotEmpty()
  @IsUUID()
  group_id: string
}