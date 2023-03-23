import { Module } from '@nestjs/common';
import { TicketTierController } from './ticket-tier/ticket-tier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketTierModule } from './ticket-tier/ticket-tier.module';
import { Connection } from 'typeorm';
import { TicketTier } from './ticket-tier/ticket-tier.entity';

@Module({
  imports: [
    TicketTierModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `containers-us-west-148.railway.app`,
      port: 8016,
      username: 'postgres',
      password: 'Qk2Rts91x9WES5au3sFA',
      database: 'railway',
      entities: [TicketTier],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([TicketTier]),
  ],
  controllers: [TicketTierController],
})

export class AppModule {
  constructor(private readonly connection: Connection) {
    console.log('Database connection established successfully');
  }
}
