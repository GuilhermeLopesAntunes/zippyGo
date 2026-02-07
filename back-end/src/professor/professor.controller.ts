import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@UseGuards(JwtAuthGuard)    
@Controller('professor')
export class ProfessorController {
    constructor(private readonly professorService: ProfessorService) {}

    @Post()
    create(@Body() dto: CreateProfessorDto) {
        return this.professorService.create(dto);
    }

    @Get()
    findAll() {
        return this.professorService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.professorService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProfessorDto) {
        return this.professorService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.professorService.remove(id);
    }
}
