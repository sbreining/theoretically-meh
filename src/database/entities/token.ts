import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
} from "typeorm";

type TokenType = { service?: string; token?: string };

@Entity({ name: "tokens" })
export class Token {
  constructor(data?: TokenType) {
    if (!data) return this;

    if ("service" in data) {
      this.service = data.service;
    }

    if ("token" in data) {
      this.token = data.token;
    }
  }

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ enum: ["TWITCH"] })
  public service: string;

  @Column({ length: 256 })
  public token: string;

  @CreateDateColumn()
  public created_at: Timestamp;
}
