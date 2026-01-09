import { ChildEntity, Column } from "typeorm";
import { User, UserRole } from "./user.entity";

@ChildEntity(UserRole.PROFSSOR)
export class Professor extends User {
  @Column()
  subject: string;
}
