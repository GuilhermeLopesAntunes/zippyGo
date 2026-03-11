import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SchoolController } from "./school.controller";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [PrismaModule, UsersModule],
    controllers: [SchoolController]
})
export class SchoolModule{}