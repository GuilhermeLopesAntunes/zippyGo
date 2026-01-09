import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from "typeorm";

export enum UserRole {
  STUDENT = 'STUDENT',
  PROFSSOR = 'PROFESSOR',
}

@Entity('users')
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'role',
  },
})
export abstract class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: true,
  })
  role: UserRole | null;
  @Column({ default: true })
  active: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
