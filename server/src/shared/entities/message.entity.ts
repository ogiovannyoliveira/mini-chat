import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  JoinColumn
} from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  sender_id: string

  @Column()
  body: string

  @Column({ default: false })
  hidden_to_me: boolean

  @Column({ default: false })
  hidden_to_all: boolean

  @Column({ nullable: true, type: 'timestamp with time zone' })
  hidden_at: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date

  // referencia na tabela de usuário
  @OneToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  sender: User
}