import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ enum: ['TWITCH'] })
  public service: string;

  @Column({ length: 256 })
  public token: string;

  @CreateDateColumn()
  public expiration: number;

  @CreateDateColumn()
  public created_at: number;
}
