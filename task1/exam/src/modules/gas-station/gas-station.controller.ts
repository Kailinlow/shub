import { Controller } from '@nestjs/common';
import { GasStationService } from './gas-station.service';

@Controller('gas-station')
export class GasStationController {
  constructor(private readonly gasStationService: GasStationService) {}
}
