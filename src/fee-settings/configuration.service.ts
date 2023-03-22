import { Injectable } from '@nestjs/common';
import { FeeSettingsService } from './fee-settings.service';

@Injectable()
export class ConfigurationService {
  constructor(private feeSettingsService: FeeSettingsService) {}

  async getServiceFeeRate(): Promise<number> {
    const feeSettings = await this.feeSettingsService.getFeeSettings();
    return feeSettings.serviceFeeRate;
  }

  async getMinimumFee(): Promise<number> {
    const feeSettings = await this.feeSettingsService.getFeeSettings();
    return feeSettings.minimumFee;
  }
}