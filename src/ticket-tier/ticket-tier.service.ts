import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketTierModule } from './ticket-tier.module';

@Injectable()
export class TicketTierService {
  constructor(
    @InjectRepository(TicketTierModule)
    private readonly ticketTierRepository: Repository<TicketTierModule>,
  ) {}

  async create(ticketTier: TicketTierModule): Promise<TicketTierModule> {
    // Calculate the service fee and promoter receives price
    const serviceFee = Math.max(
      ticketTier.buyerPrice * ticketTier.serviceFeeRate,
      ticketTier.minimumFee,
    );
    const promoterReceivesPrice = ticketTier.buyerPrice - serviceFee;

    // Set the calculated values
    ticketTier.serviceFeeRate = serviceFee;
    ticketTier.promoterReceivesPrice = promoterReceivesPrice;

    // Save the ticket tier to the database
    return this.ticketTierRepository.save(ticketTier);
  }

  async findAll(): Promise<TicketTierModule[]> {
    return this.ticketTierRepository.find();
  }

  async findOne(id: any): Promise<TicketTierModule> {
    return this.ticketTierRepository.findOne(id);
  }

  async update(id: any, ticketTier: TicketTierModule): Promise<TicketTierModule> {
    // Calculate the service fee and promoter receives price
    const serviceFee = Math.max(
      ticketTier.buyerPrice * ticketTier.serviceFeeRate,
      ticketTier.minimumFee,
    );
    const promoterReceivesPrice = ticketTier.buyerPrice - serviceFee;

    // Set the calculated values
    ticketTier.serviceFeeRate = serviceFee;
    ticketTier.promoterReceivesPrice = promoterReceivesPrice;

    // Update the ticket tier in the database
    await this.ticketTierRepository.update(id, ticketTier);

    // Return the updated ticket tier
    return this.ticketTierRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketTierRepository.delete(id);
  }
}
