import * as _ from "lodash";
import { ParkingSize } from "../type/ParkingLot";
import { Service, Inject } from "typedi";
import { CarRepository } from "../repositories/CarRepository";

@Service()
export class CarService {

    @Inject(() => CarRepository)
    private _carRepository!: CarRepository;

    public async getAll() {
        try {
            const response = await this._carRepository?.getAll();
            return response;
        } catch (error) {
            console.log("get all car error: ", error);
            throw {
                status: 500,
                message: "Internal Server Error"
            };
        }
    }

    public async getCarPlateListBySize(size: ParkingSize) {
        try {
        const response = await this._carRepository?.getCarsBySize(size);
        return response.map(car => {
            return car.plate_id;
        });
        } catch (error) {
            console.log("get car plate list by size error: ", error);
            throw {
                status: 500,
                message: "Internal Server Error"
            };
        }
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
        try {
            const carById = await this.getCarById(plate_id);
            if (!carById) {
                await this._carRepository?.addCar({plate_id, size});
                return {
                    plate_id,
                    size
                };
            } else {
                if (carById.size !== size) {
                    throw {
                        status: 409,
                        message: "Car is already register"
                    };
                }
                return {
                    plate_id,
                    size
                };
            }
        } catch (error) {
            console.log("register a car error: ", error);
            if (error.status !== 409) {
                throw {
                    status: 500,
                    message: "Internal Server Error"
                };
            } else {
                throw {
                    status: error.status,
                    message: error.message
                };
            }
        }
    }
}