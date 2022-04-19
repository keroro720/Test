import { ParkingSize } from "../entities/ParkingLot";

export function mappingSize(size: ParkingSize) {
    return size === ParkingSize.SMALL ? 1 : size === ParkingSize.MEDIUM ? 2 : 3
}

export function mappingSizeByNumber(size: number) {
    return size === 1 ? ParkingSize.SMALL : size === 2 ? ParkingSize.MEDIUM : ParkingSize.LARGE
}