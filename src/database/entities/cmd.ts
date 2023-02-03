import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export class Cmd extends BaseEntity {
  constructor(cmd?: string) {
    super();
    this.cmd = cmd;
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Index({ unique: true })
  @Column()
  public cmd: string;

  @Column()
  public response: string;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
