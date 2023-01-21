import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Viewer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 25 })
  public name: string;

  @Column({ nullable: true })
  public broadcaster_id: string;

  @Column({ default: 0 })
  public points: number;

  @CreateDateColumn()
  public created_at: Date;
}
