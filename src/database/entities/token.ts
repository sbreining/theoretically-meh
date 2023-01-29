import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ comment: 'Can be a service, or a streamer name' })
  public service: string;

  @Column({ length: 256, nullable: true })
  public access_token: string;

  @Column({ length: 256, nullable: true })
  public refresh_token: string;

  @Column({ type: 'timestamptz' })
  public expiration: Date;

  @CreateDateColumn()
  public created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
