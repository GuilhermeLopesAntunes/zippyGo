import { Injectable, ConflictException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSchoolDto } from './dto/create-school.dto'

@Injectable()
export class SchoolService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const { name, code } = createSchoolDto

    const schoolExists = await this.prisma.prismaClient.school.findUnique({
      where: { code },
    })

    if (schoolExists) {
      throw new ConflictException('Já existe uma escola com esse código')
    }

    return this.prisma.prismaClient.school.create({
      data: {
        name,
        code,
      },
    })
  }


  async findAll() {
    return this.prisma.prismaClient.school.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }


  async findById(id: string) {
    const school = await this.prisma.prismaClient.school.findUnique({
      where: { id },
    })

    if (!school) {
      throw new NotFoundException('Escola não encontrada')
    }

    return school
  }


  async findByCode(code: string) {
    const school = await this.prisma.prismaClient.school.findUnique({
      where: { code },
    })

    if (!school) {
      throw new NotFoundException('Escola não encontrada')
    }

    return school
  }

  async remove(id: string) {
    await this.findById(id)

    return this.prisma.prismaClient.school.delete({
      where: { id },
    })
  }
}
