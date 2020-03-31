import { Injectable, HttpService, OnModuleInit, Logger } from '@nestjs/common';
import { map } from 'rxjs/operators'
import { HotelQueryDto, SortTypeEnum } from './hotelQuery.dto';
import * as moment from 'moment';
import { HotelDto } from './hotel.dto';


@Injectable()
export class HotelService {
    API_URL = 'https://api.myjson.com/bins/tl0bp';
    hotels: HotelDto[];

    constructor(private httpService: HttpService) { }

    async onModuleInit() {
        /**
         * this is lifecycle events , like ngOnInit in angular , its called when the module initialized
         * the reason that i used it here just to make sure the data has been received even the user request it
         */
        try {
            await this.httpService.get(this.API_URL)
                .pipe(
                    map(response => response.data)
                ).subscribe(finalRes => {
                    this.hotels = finalRes.hotels;
                    Logger.log('*******************************************************************')
                    Logger.log('Data is received , you can request now')
                });
        } catch (error) {
            Logger.log(error)
        }
    }

    // not async , since we user observables
    search(query: HotelQueryDto) {
        return this.applyFilters(this.hotels, query);
    }

    searchByHotelName(arr: HotelDto[], subString: string) {
        const ignoreCaseSensitive = new RegExp(subString, 'i');
        return arr.filter(hotel => hotel.name.match(ignoreCaseSensitive));
    }
    searchByDestination(arr: HotelDto[], subString: string) {
        const ignoreCaseSensitive = new RegExp(subString, 'i');
        return arr.filter(hotel => hotel.city.match(ignoreCaseSensitive));
    }
    searchByMinPrice(arr: HotelDto[], price: number) {
        return arr.filter(hotel => hotel.price >= price);
    }
    searchByMaxPrice(arr: HotelDto[], price: number) {
        return arr.filter(hotel => hotel.price <= price);
    }
    searchByDateFrom(arr: HotelDto[], date: Date) {
        return arr.filter(hotel => hotel.availability.map(e =>
            moment(e.from, 'DD/MM/YYYY').isSameOrAfter(date)
            // the idea here to return array of booleans in every hotel availability
            // if any item of the availability array return true ... so we would take that object 
        ).includes(true));
    }
    searchByDateTo(arr: HotelDto[], date: Date) {
        return arr.filter(hotel => hotel.availability.map(e =>
            moment(e.to, 'DD/MM/YYYY').isSameOrBefore(date)
        ).includes(true));
    }

    sortByHotelName(arr: HotelDto[], sortType: SortTypeEnum) {
        switch (sortType) {
            case SortTypeEnum.ASC:
                arr = arr.sort((x, y) => x.name.localeCompare(y.name));
                break;
            case SortTypeEnum.DESC:
                arr = arr.sort((x, y) => x.name.localeCompare(y.name)).reverse();
                // hahahahaha :3
                // it could be arr.sort((x, y) => y.name.localeCompare(x.name)) also
                break;
            default:
                // default is Asc
                arr = arr.sort((x, y) => x.name.localeCompare(y.name));
                break;
        }
        return arr;
    }

    sortByPrice(arr: HotelDto[], sortType: SortTypeEnum) {

        switch (sortType) {
            case SortTypeEnum.ASC:
                arr = arr.sort((x, y) => x.price - y.price);
                break;
            case SortTypeEnum.DESC:
                arr = arr.sort((x, y) => x.price - y.price).reverse();
                // hahahahahaha again LOL  :3
                // it could be arr.sort((x, y) => y.price - x.price); also
                break;
            default:
                // default is Asc
                arr = arr.sort((x, y) => x.price - y.price);
                break;
        }
        return arr;
    }

    applyFilters(arr: HotelDto[], query: HotelQueryDto): HotelDto[] {
        arr = query.priceFrom ? this.searchByMinPrice(arr, query.priceFrom) : arr;
        arr = query.priceTo ? this.searchByMaxPrice(arr, query.priceTo) : arr;
        arr = query.Destination ? this.searchByDestination(arr, query.Destination) : arr;
        arr = query.HotelName ? this.searchByHotelName(arr, query.HotelName) : arr;
        arr = query.dateFrom ? this.searchByDateFrom(arr, query.dateFrom) : arr;
        arr = query.dateTo ? this.searchByDateTo(arr, query.dateTo) : arr;
        // sorting
        arr = query.sortByName ? this.sortByHotelName(arr, query.sortByName) : arr;
        arr = query.sortByPrice ? this.sortByPrice(arr, query.sortByPrice) : arr;
        return arr;
    }


}
