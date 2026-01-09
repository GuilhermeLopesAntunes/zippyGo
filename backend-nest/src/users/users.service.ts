import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Student } from "./entities/student.entity";
import { Professor } from "./entities/professor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Professor)
    private readonly professorRepository: Repository<Professor>,
  ) {}
  async findById(id: number): Promise<Student | Professor> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    if (student) return student;
    const professor = await this.professorRepository.findOne({
      where: { id },
    });
    if (professor) return professor;
    throw new NotFoundException('usuário não encontrado');
  }

  async findByUsername(username: string): Promise<Student | Professor> {
    const student = await this.studentRepository.findOne({
      where: { username },
    });
    if (student) return student;
    const professor = await this.professorRepository.findOne({
      where: { username },
    });
    if (professor) return professor;
    throw new NotFoundException('Usuário não encontrado');
  }

  async assignStudentRole(id: number): Promise<Student> {
    const user = await this.findById(id);
    if (user.role) {
      throw new BadRequestException('Usuário já possui um papel');
    }
    const student = this.studentRepository.create({
      ...user,
      role: UserRole.STUDENT,
      level: 1,
      experience: 0,
      rubies: 0,
    });
    return this.studentRepository.save(student);
  }

  async assignProfessorRole(id: number, subject: string): Promise<Professor> {
    const user = await this.findById(id);
    if (user.role) {
      throw new BadRequestException('Usuário já possui um papel');
    }
    const professor = this.professorRepository.create({
      ...user,
      role: UserRole.PROFSSOR,
      subject,
    });
    return this.professorRepository.save(professor);
  }

  async updateUser(
    id: number,
    data: Partial<Student & Professor>,
  ): Promise<Student | Professor> {
    const user = await this.findById(id);
    Object.assign(user, data);

    if (user.role === UserRole.STUDENT) {
      return this.studentRepository.save(user as Student);
    }
    if (user.role === UserRole.PROFSSOR) {
      return this.professorRepository.save(user as Professor);
    }

    throw new BadRequestException('Usuário sem papel definido');
  }
}
