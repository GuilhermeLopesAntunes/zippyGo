import { IsIn, IsOptional, IsString } from 'class-validator';

export class PromoteUserDto {
  @IsString()
  @IsIn(['professor', 'student'])
  role: 'professor' | 'student';

  @IsOptional()
  @IsString()
  schoolCode?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  professorSecretCode?: string;

  @IsOptional()
  @IsString()
  classroomCode?: string;
}
