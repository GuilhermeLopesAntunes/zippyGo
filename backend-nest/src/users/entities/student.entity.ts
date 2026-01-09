import { ChildEntity, Column } from "typeorm";
import { User, UserRole } from "./user.entity";

@ChildEntity(UserRole.STUDENT)
export class Student extends User {
  @Column({ default: 1 })
  level: number;
  @Column({ default: 0 })
  experience: number;
  @Column({ default: 0 })
  rubies: number;
}
