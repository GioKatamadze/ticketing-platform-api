import { Controller, Get, Post, Patch, Delete, Body, Param, Put } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { TicketTierService } from './ticket-tier.service';
import { TicketTierDto } from './ticket-tier.dto';
import { TicketTier } from './ticket-tier.entity';

@Controller('/ticket-tiers')
export class TicketTierController {
  constructor(private readonly ticketTierService: TicketTierService) {}

  @Get()
  async getAllTicketTiers() {
    const ticketTiers = await this.ticketTierService.findAll();
    return { data: ticketTiers };
  }

  @Get('/:id')
  @ApiParam({ name: 'id', type: 'number' })
  async getTicketTier(@Param('id') id: any) {
    const ticketTier = await this.ticketTierService.findOne(id);
    return { data: ticketTier };
  }

  @Post()
  @ApiOkResponse({ type: TicketTierDto })
  async createTicketTier(@Body() ticketTierDto: TicketTierDto) {
    const createdTicketTier = await this.ticketTierService.create(ticketTierDto);
    return { data: createdTicketTier };
  }

  @Patch('/:id')
  @ApiOkResponse({ type: TicketTierDto })
  @ApiResponse({ status: 200, description: 'Patch a ticket-tier by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  async updateTicketTier(@Param('id') id: any, @Body() ticketTierDto: TicketTierDto) {
    const updatedTicketTier = await this.ticketTierService.update(id, ticketTierDto);
    return { data: updatedTicketTier };
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, description: 'Delete a ticket-tier by ID' })
  @ApiOkResponse({ type: TicketTierDto })
  @ApiParam({ name: 'id', type: 'number' })
  async deleteTicketTier(@Param('id') id: any) {
    const deletedTicketTier = await this.ticketTierService.remove(id);
    return { data: deletedTicketTier };
  }
}
