import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketTier } from './ticket-tier.entity';
import { TicketTierController } from './ticket-tier.controller';
import { TicketTierService } from './ticket-tier.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketTier])],
  controllers: [TicketTierController],
  providers: [TicketTierService],
  exports: [TicketTierService],
})
export class TicketTierModule {}
