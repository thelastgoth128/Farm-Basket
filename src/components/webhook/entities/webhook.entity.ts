import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Webhook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event: string;

  @Column('jsonb')
  payload: any;
}
