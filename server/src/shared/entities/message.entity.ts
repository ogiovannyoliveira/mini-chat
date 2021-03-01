import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from "typeorm"

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', name: 'sender_id' })
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
}