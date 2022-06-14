import { HttpModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { RateClientService } from './rate.service';

@Module({
  imports: [HttpModule],
  providers: [RateClientService],
  exports: [RateClientService],
})
export class RateModule {}
