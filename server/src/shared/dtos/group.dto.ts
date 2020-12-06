import { ArrayMinSize, IsArray, IsNotEmpty, IsString, Length, Max } from "class-validator";

export class CreateGroupDto {
  creator_id?: string

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  member_ids: string[]

  @IsNotEmpty()
  @IsString()
  @Length(5, 70)
  name?: string

  @IsString()
  photo?: string
}