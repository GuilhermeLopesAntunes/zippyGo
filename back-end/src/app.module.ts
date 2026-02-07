// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module'; 
import { StudentModule } from './student/student.module';
import { ProfessorModule } from './professor/professor.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,     
    StudentModule,
    ProfessorModule
  ],
  controllers: [AppController], 
  providers: [AppService]       
})
export class AppModule {}
