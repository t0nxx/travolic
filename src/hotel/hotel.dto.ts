export interface AvailabilityObject {
    from: string,
    to: string,
}

export interface HotelDto {
    name: string,
    price: number,
    city: string,
    availability: AvailabilityObject[]
}