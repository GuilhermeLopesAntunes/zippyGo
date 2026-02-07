import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';

@Module({
    imports: [PrismaModule],
    controllers: [ProfessorController],
    providers: [ProfessorService],
    exports: [ProfessorService]
})
export class ProfessorModule {}
