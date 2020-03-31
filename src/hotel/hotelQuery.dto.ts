import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, Min, IsNumber, IsDate, IsDateString, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';


export enum SortTypeEnum {
    DESC = 'DESC',
    ASC = 'ASC'
}
export class HotelQueryDto {

    @ApiPropertyOptional()
    @IsOptional()
    HotelName: string;

    @ApiPropertyOptional()
    @IsOptional()
    Destination: string;

    @ApiPropertyOptional()
    @Transform(min => parseFloat(min))
    @IsOptional()
    @IsNumber()
    @Min(0)
    priceFrom: number;

    @ApiPropertyOptional()
    @Transform(max => parseFloat(max))
    @IsOptional()
    @IsNumber()
    @Min(1)
    priceTo: number;

    @ApiPropertyOptional({ description: 'plz type iso date only like 2020-12-09T00:00:00Z' })
    @IsOptional()
    @IsDateString()
    dateFrom: Date;

    @ApiPropertyOptional({ description: 'plz type iso date only like 2020-10-12T00:00:00Z' })
    @IsOptional()
    @IsDateString()
    dateTo: Date;

    @ApiPropertyOptional({ enum: Object.keys(SortTypeEnum)})
    @IsOptional()
    @IsEnum(SortTypeEnum)
    sortByPrice: SortTypeEnum;


    @ApiPropertyOptional({ enum: Object.keys(SortTypeEnum)})
    @IsOptional()
    @IsEnum(SortTypeEnum)
    sortByName: SortTypeEnum;

}