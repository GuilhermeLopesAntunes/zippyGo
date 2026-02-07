import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfessorDto } from './dto/create-professor.dto';

@Injectable()
export class ProfessorService {
    constructor(private prisma: PrismaService){}

    async create(dto: CreateProfessorDto) {
        return this.prisma.prismaClient.professor.create({
            data: {
                user: { connect: { id: dto.userId } },
                specialization: dto.specialization,
            }
        });
    }

    async findAll() {
        return this.prisma.prismaClient.professor.findMany({ include: { user: true } });
    }

    async findOne(id: string) {
        return this.prisma.prismaClient.professor.findUnique({
            where: { id },
            include: { user: true },
        });
    }

    async update(id: string, dto: Partial<CreateProfessorDto>) {
        return this.prisma.prismaClient.professor.update({ where: { id }, data: dto });
    }

    async remove(id: string) {
        return this.prisma.prismaClient.professor.delete({ where: { id } });
    }
}
