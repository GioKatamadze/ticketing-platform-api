import { IsDecimal, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TicketTierDto {
  id: any;

  @IsDecimal()
  @ApiProperty({ example: '"0.05"' })
  serviceFeeRate: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ example: '"1.00"' })
  minimumFee: number;

  @IsDecimal()
  @ApiProperty({ example: '"1.00"' })
  serviceFee: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ example: '"55.00"' })
  buyerPrice: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({ example: '"0.5"' })
  promoterReceivesPrice: number;

  calculateFee: any;
}
