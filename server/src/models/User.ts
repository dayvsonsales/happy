import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import bcrypt from "bcryptjs";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async generatePassword() {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);

    this.password = hashPassword;
  }
}
