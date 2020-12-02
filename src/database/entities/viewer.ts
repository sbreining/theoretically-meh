import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Viewer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  name: string;

  @Column()
  points: number;

  @Column()
  created_at: Date;
}
