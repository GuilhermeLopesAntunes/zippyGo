import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { ClassSubjectService } from './class-subject.service';
import { CreateClassSubjectDto } from './dto/create-class-subject.dto';
import { UpdateClassSubjectDto } from './dto/update-class-subject.dto';

@UseGuards(AuthTokenGuard)
@Controller('class-subjects')
export class ClassSubjectController {
  constructor(private readonly classSubjectService: ClassSubjectService) {}

  @Post()
  create(@Body() dto: CreateClassSubjectDto) {
    return this.classSubjectService.create(dto);
  }

  @Get()
  findAll() {
    return this.classSubjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classSubjectService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClassSubjectDto) {
    return this.classSubjectService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classSubjectService.remove(id);
  }
}
