import * as _ from "lodash";
import { ParkingSize } from "../entities/ParkingLot";
import { mappingSize, mappingSizeByNumber } from "../util/helper";
import { Service, Inject } from "typedi"
import { CarRepository } from "../repositories/CarRepository";

@Service()
export class CarService {

    @Inject(() => CarRepository)
    private _carRepository!: CarRepository

    public async getAll() {
        const response = await this._carRepository?.getAll();
        return response.map(car => {
            return {
                ...car,
                size: mappingSizeByNumber(car.size)
            }
        })
    }

    public async getCarPlateListBySize(size: ParkingSize) {
        const sizeNumber = mappingSize(size)
        const response = await this._carRepository?.getCarsBySize(sizeNumber)
        return response.map(car => {
            return car.plate_id
        })
    }

    public async getCarById(
        id: string
    ) {
        const result = await this._carRepository?.getCarById(id);
        return result;
    }

    public async registerCar(
        plate_id: string,
        size: ParkingSize
    ) {
        const carById = await this.getCarById(plate_id)
        const sizeNumber = mappingSize(size)
        if (!carById) {
            await this._carRepository?.addCar({plate_id, size: sizeNumber})
            return {
                plate_id,
                size
            }
        } else {
            if (carById.size === sizeNumber) {
                throw {
                    status: 409,
                    message: "Car is already register"
                }
            }
            return {
                plate_id,
                size
            }
        } 
    }
   
}