import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HotelQueryDto } from './hotelQuery.dto';
import { HotelService } from './hotel.service';

@ApiTags('hotel')
@Controller('hotel')
export class HotelController {

    constructor(private _hotelService: HotelService) { }

    @Get()
    search(@Query() query: HotelQueryDto) {
        return this._hotelService.search(query);
    }
}
