import { Entity, PrimaryGeneratedColumn, Column, Timestamp, CreateDateColumn } from 'typeorm';

@Entity({ name: 'viewers' })
export class Viewer {
  constructor(data?: ViewerType) {
    if (!data) return this;

    this.name = data.name || '';
    if ('name' in data) {
      this.name = data.name;
    }

    if ('points' in data) {
      this.points = data.points;
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 25 })
  public name: string;

  @Column()
  public points: number;

  @CreateDateColumn()
  public created_at: Timestamp;
}
