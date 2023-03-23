import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketTier } from './ticket-tier.entity';

@Injectable()
export class TicketTierService {
  constructor(
    @InjectRepository(TicketTier)
    private readonly ticketTierRepository: Repository<TicketTier>,
  ) {}

  async create(ticketTier: TicketTier): Promise<TicketTier> {
    const serviceFee = Math.max(
      ticketTier.buyerPrice * ticketTier.serviceFeeRate,
      ticketTier.minimumFee,
    );
    const promoterReceivesPrice = ticketTier.buyerPrice - serviceFee;
    ticketTier.promoterReceivesPrice = promoterReceivesPrice;

    return this.ticketTierRepository.save(ticketTier);
  }

  async findAll(): Promise<TicketTier[]> {
    return this.ticketTierRepository.find();
  }

  async findOne(id: any): Promise<TicketTier> {
    return this.ticketTierRepository.query('SELECT * FROM "ticket_tier" WHERE id = $1', [id])
  }

  async update(id: any, ticketTier: TicketTier): Promise<TicketTier> {
    const serviceFee = Math.max(
      ticketTier.buyerPrice * ticketTier.serviceFeeRate,
      ticketTier.minimumFee,
    );
    const promoterReceivesPrice = ticketTier.buyerPrice - serviceFee;
    ticketTier.serviceFeeRate = serviceFee;
    ticketTier.promoterReceivesPrice = promoterReceivesPrice;
    await this.ticketTierRepository.update(id, ticketTier);
    return this.ticketTierRepository.query('SELECT * FROM "ticket_tier" WHERE id = $1', [id]);
  }

  async remove(id: number): Promise<void> {
    await this.ticketTierRepository.delete(id);
  }
}
