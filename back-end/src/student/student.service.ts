// src/student/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    return this.prisma.prismaClient.student.create({
        data: {
            id: dto.userId, 
            level: dto.level,
            currentXp: dto.currentXp,
            totalXp: dto.totalXp,
            levelProgress: dto.levelProgress,
            rank: dto.rank,
            ruby: dto.ruby,
        },
        });
  }

  async findAll() {
    return this.prisma.prismaClient.student.findMany({ include: { user: true } });
  }

  async findOne(id: string) {
    const student = await this.prisma.prismaClient.student.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: string, dto: UpdateStudentDto) {
    return this.prisma.prismaClient.student.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.prismaClient.student.delete({ where: { id } });
  }
}
