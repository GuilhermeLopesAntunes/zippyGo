import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './nest/users/users.module';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { StudentModule } from './student/student.module';
import { ProfessorService } from './professor/professor.service';
import { ProfessorController } from './professor/professor.controller';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, StudentModule, ProfessorModule],
  controllers: [AppController, StudentController, ProfessorController],
  providers: [AppService, PrismaService, StudentService, ProfessorService],
})
export class AppModule {}
