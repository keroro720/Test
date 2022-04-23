import * as _ from "lodash";
import { IParkingLot, ParkingSize } from "../type/ParkingLot";
import { Service, Inject } from "typedi";
import { CarService } from "./CarService";
import { ParkingLogsService } from "./ParkingLogsService";
import { ParkingLotRepository } from "../repositories/ParkingLotRepository";

@Service()
export class ParkingService {
    [x: string]: any;

    @Inject()
    private _carService: CarService | undefined;

    @Inject(()=> ParkingLogsService)
    private _parkingLogsService!: ParkingLogsService;

    @Inject(()=> ParkingLotRepository)
    private _parkingLotRepository!: ParkingLotRepository;

    public async parkingACar(
        plate_id: string,
        size: ParkingSize
    ) {
        try {
            const isDuplicate = await this._parkingLotRepository.getParkingLotByCarId(plate_id);
            if (!_.isUndefined(isDuplicate)) {
                throw {
                    status: 409,
                    message: "Your car is parking right now."
                };
            }
            await this._carService?.registerCar(plate_id, size);
            const nearestParkingLot = await this._parkingLotRepository.getNearestAvailableParkinglotBySize(size);
            if (!_.isUndefined(nearestParkingLot)) {

            await this._parkingLotRepository.parkingCarById(nearestParkingLot.slot_id, plate_id);
            await this._parkingLogsService?.addEnteringLog(nearestParkingLot.slot_id, plate_id);
            return `Your parking lot is ${nearestParkingLot.slot_id}`;
        } else {
                throw {
                    status: 400,
                    message: "No parking slot available"
                };
            }
        } catch(error) {
            console.log("Parking a car error: ", error);
            if (error.status === 400 || error.status === 409) {
                throw {
                    status: error.status,
                    message: error.message
                };
            } else {
                throw {
                    status: 500,
                    message: "Internal server error"
                };
            }
        }
    }

    public async leavingALot(
        plate_id: string
    ) {
        try {
            const parkinglotByCarId =  await this._parkingLotRepository.getParkingLotByCarId(plate_id);
            if (!parkinglotByCarId) {
                throw {
                    status: 404,
                    message: `No car with ${plate_id} is parking`
                };
            } else {
                await this._parkingLotRepository.emptySlotByCarId(plate_id);
                await this._parkingLogsService?.addLeavingTime(plate_id, parkinglotByCarId.slot_id);
                return `${plate_id} is leaving`;
            }
        } catch(error) {
            console.log("Leaving a lot error: ", error);
            if (error.status === 404) {
                throw {
                    status: error.status,
                    message: error.message
                };
            } else {
                throw {
                    status: 500,
                    message: "Internal server error"
                };
            }
        }
    }
}