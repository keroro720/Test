import { ICar } from "../../entities/Car";

export interface ICarRepository {
    getCarsBySize: (size: number) => Promise<ICar[]>
    getAll: () => Promise<ICar[]>
    addCar: (data: ICar) => Promise<void>;
    getCarById: (plate_id: string) => Promise<ICar>;
}