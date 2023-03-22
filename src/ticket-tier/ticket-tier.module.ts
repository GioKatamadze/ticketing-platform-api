import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class TicketTierModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  serviceFeeRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  minimumFee: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  buyerPrice: number;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  promoterReceivesPrice: number;

  @BeforeInsert()
  calculateFee() {
    // Calculate the service fee based on the service fee rate and minimum fee
    const serviceFee = Math.max(this.buyerPrice * this.serviceFeeRate / 100, this.minimumFee);
    // Calculate the promoter receives price as the difference between the buyer price and service fee
    this.promoterReceivesPrice = this.buyerPrice - serviceFee;
  }
}
