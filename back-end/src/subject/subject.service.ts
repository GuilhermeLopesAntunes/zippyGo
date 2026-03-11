import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubjectDto) {
    return this.prisma.prismaClient.subject.create({ data: dto });
  }

  async findAll() {
    return this.prisma.prismaClient.subject.findMany({
      include: {
        classes: {
          include: {
            classroom: true,
            professor: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const subject = await this.prisma.prismaClient.subject.findUnique({
      where: { id },
      include: {
        classes: {
          include: {
            classroom: true,
            professor: true,
          },
        },
      },
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  async update(id: string, dto: UpdateSubjectDto) {
    return this.prisma.prismaClient.subject.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.prismaClient.subject.delete({ where: { id } });
  }
}
