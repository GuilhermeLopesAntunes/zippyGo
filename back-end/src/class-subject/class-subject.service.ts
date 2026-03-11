import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassSubjectDto } from './dto/create-class-subject.dto';
import { UpdateClassSubjectDto } from './dto/update-class-subject.dto';

@Injectable()
export class ClassSubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClassSubjectDto) {
    return this.prisma.prismaClient.classSubject.create({
      data: {
        classroom: { connect: { id: dto.classroomId } },
        subject: { connect: { id: dto.subjectId } },
        professor: { connect: { id: dto.professorId } },
      },
      include: {
        classroom: true,
        subject: true,
        professor: true,
      },
    });
  }

  async findAll() {
    return this.prisma.prismaClient.classSubject.findMany({
      include: {
        classroom: true,
        subject: true,
        professor: true,
      },
    });
  }

  async findOne(id: string) {
    const classSubject = await this.prisma.prismaClient.classSubject.findUnique({
      where: { id },
      include: {
        classroom: true,
        subject: true,
        professor: true,
      },
    });

    if (!classSubject) {
      throw new NotFoundException('Class subject not found');
    }

    return classSubject;
  }

  async update(id: string, dto: UpdateClassSubjectDto) {
    const data = {
      ...(dto.classroomId ? { classroom: { connect: { id: dto.classroomId } } } : {}),
      ...(dto.subjectId ? { subject: { connect: { id: dto.subjectId } } } : {}),
      ...(dto.professorId ? { professor: { connect: { id: dto.professorId } } } : {}),
    };

    return this.prisma.prismaClient.classSubject.update({
      where: { id },
      data,
      include: {
        classroom: true,
        subject: true,
        professor: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.prismaClient.classSubject.delete({ where: { id } });
  }
}
