// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);  
        const user = await this.prisma.prismaClient.user.create({
          data: {
            username: createUserDto.username,
            password: hashedPassword,
            fullName: createUserDto.fullName,
          },
        });
        return { id: user.id, username: user.username };
      }

  async login(username: string, password: string) {
    const user = await this.prisma.prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Senha inválida');

    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
