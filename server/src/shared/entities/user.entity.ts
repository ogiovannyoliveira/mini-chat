import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Entity
} from "typeorm"
import { hash, compare } from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 50 })
  nickname: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10)
  }

  async comparePassword(given: string): Promise<boolean> {
    return await compare(given, this.password);
  }
}