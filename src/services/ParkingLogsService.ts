import * as _ from "lodash";
import { IParkingLot, ParkingSize } from "../entities/ParkingLot";
import { uuid } from 'uuidv4';
import dayjs from "dayjs";
import { IParkingLog } from "../entities/ParkingLog";
import { mappingSize } from "../util/helper";
import { ICar } from "../entities/Car";
import { Service, Inject } from "typedi"
import { ParkingLogRepository } from "../repositories/ParkingLogRepository";

@Service()
export class ParkingLogsService {

    @Inject(() => ParkingLogRepository)
    private _parkingLogRepository!: ParkingLogRepository

    public async getAllLog() {
        return this._parkingLogRepository?.getAllLog()
    }

    public async getLogsByPlateId(plateId: string) {
        return this._parkingLogRepository?.getLogByPlateId(plateId)
    }

    public async getLogsBySlotId(slotId: string) {
        return this._parkingLogRepository?.getLogBySlotId(slotId)

    }

    public async addEnteringLog(
        parkinglot_id: string,
        car_id: string
    ) {
        await this._parkingLogRepository?.addLog({
            id: uuid(), 
            parkinglot_id,
            car_id,
            entering_time: dayjs().unix()
        })

    }

    public async addLeavingTime(
        car_id: string,
        parkinglot_id: string
    ) {
        const response = await this._parkingLogRepository?.getLastestLogByCarIdAndPlateId(car_id, parkinglot_id)
        if (response) {
            await this._parkingLogRepository?.editLeavingTimeById(response?.id, dayjs().unix())
        }
    }
   
}