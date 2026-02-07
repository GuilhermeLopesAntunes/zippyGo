
import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateStudentDto {
  userId: string;
  level: number;
  currentXp: number;
  totalXp: number;
  levelProgress: number;
  rank: number;
  ruby: number;
}