import { Module, HttpModule } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';

@Module({
  imports: [HttpModule],
  providers: [HotelService],
  controllers: [HotelController]
})
export class HotelModule { }
