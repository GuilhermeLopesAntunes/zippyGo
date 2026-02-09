// src/student/student.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Rank } from 'src/enums/ranks.enum';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    return this.prisma.prismaClient.student.create({
        data: {
            user: { connect: { id: dto.userId } },
            level: 1,
            currentXp: 0,
            totalXp: 0,
            levelProgress: 1,
            rank: Rank.Bronze,
            ruby: 30,
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
