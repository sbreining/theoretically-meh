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

  @Column()
  public points: number;

  @CreateDateColumn()
  public created_at: number;
}
