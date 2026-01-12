import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Professor } from "./entities/professor.entity";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";

@Module({
     imports: [TypeOrmModule.forFeature([Student, Professor,User])],
     providers: [UsersService],
     exports: [UsersService]
})
export class UserModule {}
