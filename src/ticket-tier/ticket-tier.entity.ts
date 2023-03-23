import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';


@Entity()
export class TicketTier {
  @PrimaryGeneratedColumn()
  id: any;

  @Column({ type: 'decimal', precision: 5, scale: 2, })
  serviceFeeRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, })
  serviceFee: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, })
  minimumFee: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, })
  buyerPrice: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, })
  promoterReceivesPrice: number;

  @BeforeInsert()
  calculateFee() {
    this.serviceFee = Math.max(this.buyerPrice * this.serviceFeeRate, this.minimumFee);
    this.promoterReceivesPrice = this.buyerPrice - this.serviceFee;
  }
}
