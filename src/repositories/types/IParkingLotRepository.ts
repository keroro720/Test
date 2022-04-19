import { IParkingLot } from "../../entities/ParkingLot";

export interface IParkingLotRepository {
    getAll: () => Promise<IParkingLot[]>;
    addParkingLot: (data: IParkingLot[]) => Promise<void>;
    getParkingLotById: (id: string) => Promise<IParkingLot>;
    parkingCarById: (id: string, car_id: string) => Promise<void>;
    emptyCarByCarId: (car_id: string) => Promise<void>
    getParkingLotByCarId: (car_id: string) => Promise<IParkingLot>
    getNearestAvailableParkinglotBySize:(size: number) =>  Promise<IParkingLot | undefined>
    getFarestPosition:() => Promise<Number>
}