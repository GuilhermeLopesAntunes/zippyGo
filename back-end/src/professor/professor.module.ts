import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [ProfessorController],
    providers: [ProfessorService],
    exports: [ProfessorService]
})
export class ProfessorModule {}
