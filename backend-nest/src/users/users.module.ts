import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Professor } from "./entities/professor.entity";

@Module({
     imports: [TypeOrmModule.forFeature([Student, Professor,])],
     controllers:
})
export class UserModule {}
