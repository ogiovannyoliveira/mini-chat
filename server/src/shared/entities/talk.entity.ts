import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from "typeorm"

@Entity()
export class Talk {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', name: 'user_primary_id' })
  user_primary_id: string

  @Column({ type: 'uuid', name: 'user_secondary_id' })
  user_secondary_id: string

  @Column({ default: false })
  hidden_to_primary: boolean

  @Column({ default: false })
  hidden_to_secondary: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at: Date
}