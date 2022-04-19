import { Service } from "typedi"
import { IParkingLog } from "../../../src/entities/ParkingLog"
import { IParkingLogRepository } from "../../../src/repositories/types/IParkingLogRepository"

@Service()
export class MockParkingLogsRepository implements IParkingLogRepository {

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
       return this.parkingLogs.filter((parkinglog => {parkinglog.parkinglot_id === slot_id}));
    }
}