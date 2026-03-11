import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClassroomDto) {
    const { schoolId, ...data } = dto;

    return this.prisma.prismaClient.classRoom.create({
      data: {
        ...data,
        school: { connect: { id: schoolId } },
      },
    });
  }

  async findAll() {
    return this.prisma.prismaClient.classRoom.findMany({
      include: {
        school: true,
        students: true,
        subjects: {
          include: {
            subject: true,
            professor: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const classroom = await this.prisma.prismaClient.classRoom.findUnique({
      where: { id },
      include: {
        school: true,
        students: true,
        subjects: {
          include: {
            subject: true,
            professor: true,
          },
        },
      },
    });

    if (!classroom) {
      throw new NotFoundException('Classroom not found');
    }

    return classroom;
  }

  async update(id: string, dto: UpdateClassroomDto) {
    const { schoolId, ...data } = dto;

    return this.prisma.prismaClient.classRoom.update({
      where: { id },
      data: {
        ...data,
        ...(schoolId ? { school: { connect: { id: schoolId } } } : {}),
      },
    });
  }

  async remove(id: string) {
    return this.prisma.prismaClient.classRoom.delete({ where: { id } });
  }
}
