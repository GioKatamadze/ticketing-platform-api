import { Module } from '@nestjs/common';
import { NestApplication } from '@nestjs/core';
import { TicketTierController } from 'src/ticket-tier/ticket-tier.controller';
import { TicketTierModule } from 'src/ticket-tier/ticket-tier.module';
import { TicketTierService } from 'src/ticket-tier/ticket-tier.service';

@Module({
  imports: [TicketTierModule],
  controllers: [TicketTierController],
  providers: [TicketTierService],
})
export class AppModule {
    app: NestApplication;
  
    constructor(app: NestApplication) {}
}