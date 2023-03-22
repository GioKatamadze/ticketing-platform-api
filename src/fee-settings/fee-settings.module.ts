import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FeeSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  serviceFeeRate: number;

  @Column({ type: 'float' })
  minimumFee: number;
}