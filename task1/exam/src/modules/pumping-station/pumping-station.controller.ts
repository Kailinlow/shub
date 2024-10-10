import { Controller } from '@nestjs/common';
import { PumpingStationService } from './pumping-station.service';

@Controller('pumping-station')
export class PumpingStationController {
  constructor(private readonly pumpingStationService: PumpingStationService) {}
}
