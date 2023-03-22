import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketTierModule } from './ticket-tier.module';
import { ConfigurationService } from 'src/fee-settings/configuration.service';

@Injectable()
export class TicketTierService {
  constructor(
    @InjectRepository(TicketTierModule)
    private readonly ticketTierRepository: Repository<TicketTierModule>,
    private configService: ConfigurationService
  ) {}

  async create(ticketTier: TicketTierModule): Promise<TicketTierModule> {
    const serviceFee = Math.max(
      ticketTier.buyerPrice * ticketTier.serviceFeeRate,
      ticketTier.minimumFee,
    );
    const promoterReceivesPrice = ticketTier.buyerPrice - serviceFee;
    ticketTier.serviceFeeRate = serviceFee;
    ticketTier.promoterReceivesPrice = promoterReceivesPrice;

    return this.ticketTierRepository.save(ticketTier);
  }

  async findAll(): Promise<TicketTierModule[]> {
    return this.ticketTierRepository.find();
  }

  async findOne(id: any): Promise<TicketTierModule> {
    return this.ticketTierRepository.findOne(id);
  }

  async update(id: any, ticketTier: TicketTierModule): Promise<TicketTierModule> {
    const serviceFee = Math.max(
      ticketTier.buyerPrice * ticketTier.serviceFeeRate,
      ticketTier.minimumFee,
    );
    const promoterReceivesPrice = ticketTier.buyerPrice - serviceFee;
    ticketTier.serviceFeeRate = serviceFee;
    ticketTier.promoterReceivesPrice = promoterReceivesPrice;
    await this.ticketTierRepository.update(id, ticketTier);
    return this.ticketTierRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ticketTierRepository.delete(id);
  }

  async calculateTicketPrices(
    buyerPrice: number,
  ): Promise<{ serviceFee: number; promoterReceives: number }> {
    const serviceFeeRate = await this.configService.getServiceFeeRate();
    const minimumFee = await this.configService.getMinimumFee();
    let serviceFee = buyerPrice * serviceFeeRate;
    if (serviceFee < minimumFee) {
      serviceFee = minimumFee;
    }
    const promoterReceives = buyerPrice - serviceFee;

    return { serviceFee, promoterReceives };
  }
}
