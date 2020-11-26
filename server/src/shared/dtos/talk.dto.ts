import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateTalkDto {
  user_primary_id?: string

  @IsNotEmpty()
  @IsUUID()
  user_secondary_id: string
}