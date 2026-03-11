
import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateStudentDto {
  userId: string;
  classroomId: string;
  level: number;
  currentXp: number;
  totalXp: number;
  levelProgress: number;
  rank: string;
  ruby: number;
}
