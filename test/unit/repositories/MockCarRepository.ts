import { ParkingSize } from "src/type/ParkingLot";
import { Service } from "typedi"
import { ICar } from "../../../src/type/Car";
import { ICarRepository } from "../../../src/repositories/types/ICarRepository";

@Service()
export class MockCarRepository implements ICarRepository {

    private cars:ICar[] = [
        {
            plate_id: "AU123",
            size: ParkingSize.MEDIUM
        }
    ]

    public async getCarById (plate_id: string): Promise<ICar> {
        const result = this.cars.find(car => {
            return car.plate_id === plate_id
        })
        return result!;
    }

    public async getCarsBySize (size: ParkingSize) {
        const result = this.cars.filter(car => {
            return car.size === size
        })
        return result;
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