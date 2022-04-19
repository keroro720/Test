import { Service } from "typedi"
import { ICar } from "../../../src/entities/Car";
import { ICarRepository } from "../../../src/repositories/types/ICarRepository";

@Service()
export class MockCarRepository implements ICarRepository {

    private cars:ICar[] = []

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