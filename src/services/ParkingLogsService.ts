import * as _ from "lodash";
import { uuid } from 'uuidv4';
import dayjs from "dayjs";
import { Service, Inject } from "typedi";
import { ParkingLogRepository } from "../repositories/ParkingLogRepository";

@Service()
export class ParkingLogsService {

    @Inject(() => ParkingLogRepository)
    private _parkingLogRepository!: ParkingLogRepository;

    public async getAllLog() {
        return this._parkingLogRepository?.getAllLog();
    }

    public async getLogsByPlateId(plateId: string) {
        return this._parkingLogRepository?.getLogByCarId(plateId);
    }

    public async getLogsBySlotId(slotId: string) {
        return this._parkingLogRepository?.getLogBySlotId(slotId);

    }

    public async addEnteringLog(
        slot_id: string,
        car_id: string
    ) {
        await this._parkingLogRepository?.addLog({
            id: uuid(),
            slot_id,
            car_id,
            entering_time: dayjs().unix(),
            leaving_time: null
        });

    }

    public async addLeavingTime(
        car_id: string,
        slot_id: string
    ) {
        const response = await this._parkingLogRepository?.getLastestLogByCarIdAndPlateId(car_id, slot_id);
        if (response) {
            await this._parkingLogRepository?.editLeavingTimeById(response?.id, dayjs().unix());
        }
    }
}