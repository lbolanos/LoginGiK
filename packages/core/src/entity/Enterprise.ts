import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
