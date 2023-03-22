import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeeSettings } from './fee-settings.module';

@Injectable()
export class FeeSettingsService {
  constructor(
    @InjectRepository(FeeSettings)
    private readonly feeSettingsRepository: Repository<FeeSettings>,
  ) {}

  async getFeeSettings(): Promise<FeeSettings> {
    const feeSettings = await this.feeSettingsRepository.findOne({
      order: { id: 'ASC' },
    });
    if (!feeSettings) {
      const defaultFeeSettings = new FeeSettings();
      defaultFeeSettings.serviceFeeRate = 0.05; // Default service fee rate is 5%
      defaultFeeSettings.minimumFee = 1.0; // Default minimum fee is $1.00
      return this.feeSettingsRepository.save(defaultFeeSettings);
    }
    return feeSettings;
  }
  async updateFeeSettings(feeSettings: FeeSettings): Promise<FeeSettings> {
    if (feeSettings.serviceFeeRate < 0) {
      throw new Error('Service fee rate must be a positive number');
    }
    if (feeSettings.minimumFee < 0) {
      throw new Error('Minimum fee must be a positive number');
    }
    return this.feeSettingsRepository.save(feeSettings);
  }
}