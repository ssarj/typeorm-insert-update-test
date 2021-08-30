import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class User {
  constructor(args: Partial<User> = {}) {
    Object.assign(this, args);
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp', precision: 6 })
  createdAt: Date

  assertConsistency() {
    if (this.id !== this.name) {
      throw new Error(`Inconsistent state id: ${this.id}, name: ${this.name}`)
    }
  }
}
