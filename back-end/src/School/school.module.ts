import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { SchoolController } from "./school.controller";

@Module({
    imports: [PrismaModule],
    controllers: [SchoolController]
})
export class SchoolModule{}