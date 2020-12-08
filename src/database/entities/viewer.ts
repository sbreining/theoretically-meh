import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'viewers' })
export class Viewer {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 25 })
  public name: string;

  @Column()
  public points: number;

  @CreateDateColumn()
  public created_at: Timestamp;
}
