import { ICar } from "../entities/Car";
import { ICarRepository } from "./types/ICarRepository";
import { Service } from "typedi"

@Service()
export class CarRepository implements ICarRepository {

    private cars:ICar[] = [
        {
            plate_id: "1231232",
            size: 1
        }
    ]

    public async getCarById (plate_id: string): Promise<ICar> {
        const result = this.cars.find(car => {
            return car.plate_id === plate_id
        })
        return result!;
    }

    public async getCarsBySize (size: number) {
        const result = this.cars.filter(car => {
            return car.size === size
        })
        return result!;   
    };

    public async getAll() {
        return this.cars
    }

    public async addCar (data: ICar) {
        this.cars.push(
            {
                ...data
            }
        )
    };
}