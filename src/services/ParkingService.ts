import * as _ from "lodash";
import { IParkingLot, ParkingSize } from "../entities/ParkingLot";
import { Service, Inject } from "typedi"
import { CarService } from "./CarService";
import { mappingSize } from "../util/helper";
import { ParkingLogsService } from "./ParkingLogsService";
import { ParkingLotRepository } from "../repositories/ParkingLotRepository";

@Service()
export class ParkingService {
    [x: string]: any;

    @Inject()
    private _carService: CarService | undefined

    @Inject(()=> ParkingLogsService)
    private _parkingLogsService!: ParkingLogsService

    @Inject(()=> ParkingLotRepository)
    private _parkingLotRepository!: ParkingLotRepository

    private parkingLots: IParkingLot[] = [];

    public async parkingACar(
        plate_id: string,
        size: ParkingSize
    ) {
        const isDuplicate = await this._parkingLotRepository.getParkingLotByCarId(plate_id)
        if (isDuplicate) {
            throw {
                status: 409,
                message: "Your car is parking right now."
            }
        }
        await this._carService?.registerCar(plate_id, size);
        const sizeNumber = mappingSize(size)
        const nearestParkingLot = await this._parkingLotRepository.getNearestAvailableParkinglotBySize(sizeNumber)
        console.log(nearestParkingLot)
        if (!_.isUndefined(nearestParkingLot)) {

        await this._parkingLotRepository.parkingCarById(nearestParkingLot.parkinglot_id, plate_id)
        await this._parkingLogsService?.addEnteringLog(nearestParkingLot.parkinglot_id, plate_id)
        return `Your parking lot is ${nearestParkingLot.parkinglot_id}`
    } else {
            throw {
                status: 400,
                message: "No parking slot available"
            }
        }
    }

    public async leavingALot(
        plate_id: string
    ) {
        const parkinglotByCarId =  await this._parkingLotRepository.getParkingLotByCarId(plate_id)
        if (!parkinglotByCarId) {
            throw {
                status: 404,
                message: `No car with ${plate_id} is parking`
            }
        } else {
            await this._parkingLotRepository.emptyCarByCarId(plate_id)
            await this._parkingLogsService?.addLeavingTime(plate_id, parkinglotByCarId.parkinglot_id);
            return `${plate_id} is leaving`
        }
    }
}