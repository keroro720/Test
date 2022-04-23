import { ParkingSize } from "src/type/ParkingLot";
import { ICar } from "../../type/Car";

export interface ICarRepository {
    getCarsBySize: (size: ParkingSize) => Promise<ICar[]>
    getAll: () => Promise<ICar[]>
    addCar: (data: ICar) => Promise<void>;
    getCarById: (plate_id: string) => Promise<ICar>;
}