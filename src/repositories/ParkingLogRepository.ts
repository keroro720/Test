import { IParkingLog } from "../entities/ParkingLog";
import { IParkingLogRepository } from "./types/IParkingLogRepository";
import { Service } from "typedi"

@Service()
export class ParkingLogRepository implements IParkingLogRepository {

    private parkingLogs:IParkingLog[] = []

    public async getAllLog () {
        return this.parkingLogs
    };

    public async addLog (data: IParkingLog) {
        this.parkingLogs.push({
            ...data
        })
    }

    public async editLeavingTimeById(
        id: string,
        time: number
    ) {
        const index = this.parkingLogs.findIndex(parkingLog => {
            return parkingLog.id === id
        })
        this.parkingLogs[index].leaving_time = time
    }

    public async getLogByPlateId(
        plate_id: string
    ) {
       return this.parkingLogs.filter((parkinglog => {parkinglog.car_id === plate_id}));
    }

    public async getLogBySlotId(
        slot_id: string
    ) {
        console.log(this.parkingLogs)
        console.log(slot_id)
       return this.parkingLogs.filter((parkinglog => {parkinglog.parkinglot_id === slot_id}));
    }

    public async getLastestLogByCarIdAndPlateId(
        car_id: string,
        parking_id: string
    ) {
        return this.parkingLogs.find(each => {
            return each.car_id === car_id && each.parkinglot_id === parking_id && !each.leaving_time
        })
    }
}