// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module'; 
import { StudentModule } from './student/student.module';
import { ProfessorModule } from './professor/professor.module';
import { ClassroomModule } from './classroom/classroom.module';
import { SubjectModule } from './subject/subject.module';
import { ClassSubjectModule } from './class-subject/class-subject.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,     
    StudentModule,
    ProfessorModule,
    ClassroomModule,
    SubjectModule,
    ClassSubjectModule
  ],
  controllers: [AppController], 
  providers: [AppService]       
})
export class AppModule {}
