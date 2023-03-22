import { Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { NestApplication } from '@nestjs/core';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
    app: NestApplication;
  
    constructor(app: NestApplication) {}
}