import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity
} from "typeorm"

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', name: 'creator_id' })
  creator_id: string

  @Column({ type: 'uuid', array: true, name: 'member_ids' })
  member_ids: string[]

  @Column({ type: 'character varying', length: 70 })
  name: string

  @Column({ type: 'character varying', length: 50 })
  photo: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn({ nullable: true })
  updated_at?: Date
}