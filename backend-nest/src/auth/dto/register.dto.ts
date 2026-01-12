import { IsString, MinLength } from "class-validator";

export class RegisterDTO {
  @IsString()
  fullName: string;
  @IsString()
  @MinLength(6)
  username: string;
  @IsString()
  password: string;
}
