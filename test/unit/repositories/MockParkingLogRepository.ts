import { Service } from "typedi";
import { IParkingLog } from "../../../src/type/ParkingLog";
import { IParkingLogRepository } from "../../../src/repositories/types/IParkingLogRepository";
import * as _ from "lodash";

@Service()
export class MockParkingLogRepository implements IParkingLogRepository {

    private parkingLogs:IParkingLog[] = [];

    public async getAllLog () {
        return this.parkingLogs;
    }

    public async addLog (data: IParkingLog) {
        this.parkingLogs.push({
            ...data
        });
    }

    public async editLeavingTimeById(
        id: string,
        time: number
    ) {
        const index = this.parkingLogs.findIndex(parkingLog => {
            return parkingLog.id === id;
        });
        this.parkingLogs[index].leaving_time = time;
    }

    public async getLogByCarId(
        car_id: string
    ) {
       return this.parkingLogs.filter((parkinglog => {parkinglog.car_id === car_id;}));
    }

    public async getLogBySlotId(
        slot_id: string
    ) {
       return this.parkingLogs.filter((parkinglog => {parkinglog.slot_id === slot_id;}));
    }

    public async getLastestLogByCarIdAndPlateId(
        car_id: string,
        slot_id: string
    ) {
        return _.sortBy(this.parkingLogs, "entering_time").find(each => {
            return each.car_id === car_id && each.slot_id === slot_id && !each.leaving_time;
        });
    }
}