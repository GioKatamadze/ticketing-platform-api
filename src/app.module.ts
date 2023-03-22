import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { TicketTierModule } from './ticket-tier/ticket-tier.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: `containers-us-west-148.railway.app`,
      port: 8016,
      username: 'postgres',
      password: 'Qk2Rts91x9WES5au3sFA',
      database: 'railway',
      entities: [], // TODO: add your entities here
      synchronize: true, // set to false in production
    }),
    TicketTierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private readonly connection: Connection) {
    console.log('Database connection established successfully');
  }
}
