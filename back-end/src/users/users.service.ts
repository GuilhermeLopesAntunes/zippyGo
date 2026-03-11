
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto';
import { PromoteUserDto } from './dto/promote-user.dto';
import { Rank } from 'src/enums/ranks.enum';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

   
  async findAll() {
    return this.prisma.prismaClient.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.prismaClient.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
 async findByName(username: string) {
    const user = await this.prisma.prismaClient.user.findUnique({
      where: { username },
    })
    if(!user) false
    return true;
  }
 

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.prismaClient.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prisma.prismaClient.user.delete({
      where: { id },
    });
  }

  async promote(userId: string, dto: PromoteUserDto) {
    const user = await this.prisma.prismaClient.user.findUnique({
      where: { id: userId },
      include: { student: true, professor: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.role === 'professor') {
      if (user.professor) {
        throw new ConflictException('User is already a professor');
      }
      if (user.student) {
        throw new ConflictException('User is already a student');
      }
      if (!dto.schoolCode) {
        throw new BadRequestException('schoolCode is required for professor promotion');
      }
      if (!dto.specialization) {
        throw new BadRequestException('specialization is required for professor promotion');
      }
      if (!dto.professorSecretCode) {
        throw new BadRequestException('professorSecretCode is required for professor promotion');
      }
      if (!process.env.PROFESSOR_SECRET_CODE) {
        throw new BadRequestException('PROFESSOR_SECRET_CODE is not configured on server');
      }
      if (dto.professorSecretCode !== process.env.PROFESSOR_SECRET_CODE) {
        throw new UnauthorizedException('Invalid professor secret code');
      }

      const school = await this.prisma.prismaClient.school.findUnique({
        where: { code: dto.schoolCode },
      });

      if (!school) {
        throw new NotFoundException('School code not found');
      }

      await this.prisma.prismaClient.$transaction([
        this.prisma.prismaClient.user.update({
          where: { id: userId },
          data: { schoolId: school.id },
        }),
        this.prisma.prismaClient.professor.create({
          data: {
            user: { connect: { id: userId } },
            specialization: dto.specialization,
          },
        }),
      ]);

      return this.prisma.prismaClient.user.findUnique({
        where: { id: userId },
        include: { school: true, professor: true, student: true },
      });
    }

    if (user.student) {
      throw new ConflictException('User is already a student');
    }
    if (user.professor) {
      throw new ConflictException('User is already a professor');
    }
    if (!dto.classroomCode) {
      throw new BadRequestException('classroomCode is required for student promotion');
    }

    const classroom = await this.prisma.prismaClient.classRoom.findUnique({
      where: { code: dto.classroomCode },
    });

    if (!classroom) {
      throw new NotFoundException('Classroom code not found');
    }

    await this.prisma.prismaClient.$transaction([
      this.prisma.prismaClient.user.update({
        where: { id: userId },
        data: { schoolId: classroom.schoolId },
      }),
      this.prisma.prismaClient.student.create({
        data: {
          user: { connect: { id: userId } },
          classroom: { connect: { id: classroom.id } },
          level: 1,
          currentXp: 0,
          totalXp: 0,
          levelProgress: 1,
          rank: Rank.Bronze,
          ruby: 30,
        },
      }),
    ]);

    return this.prisma.prismaClient.user.findUnique({
      where: { id: userId },
      include: { school: true, student: true, professor: true },
    });
  }
}
