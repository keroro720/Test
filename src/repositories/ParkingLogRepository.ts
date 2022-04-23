import { IParkingLog } from "../type/ParkingLog";
import { IParkingLogRepository } from "./types/IParkingLogRepository";
import { Service } from "typedi"
import { database } from "../../src";
@Service()
export class ParkingLogRepository implements IParkingLogRepository {

    private table_name = "parkinglog"

    private queryBuilder() {
        const client = database(this.table_name)
        return client
    }

    public async getAllLog () {
        const client = this.queryBuilder()
        const response = await client.select();
        return response;
    };

    public async addLog (data: IParkingLog) {
        const client = this.queryBuilder()
        await client.insert(data);
    }

    public async editLeavingTimeById(
        id: string,
        time: number
    ) {
        const client = this.queryBuilder()
        await client.update({leaving_time: time}).where({id});
    }

    public async getLogByPlateId(
        plate_id: string
    ) {
        const client = this.queryBuilder()
        const response = await client.select().where({plate_id});
        return response;
    }

    public async getLogBySlotId(
        slot_id: string
    ) {
        const client = this.queryBuilder()
        const response = await client.select().where({slot_id});
        return response;
    }

    public async getLastestLogByCarIdAndPlateId(
        car_id: string,
        slot_id: string
    ) {
        const client = this.queryBuilder()
        const response = await client.select().where({car_id}).andWhere({slot_id}).andWhere({leaving_time: null}).orderBy("entering_time", "desc").first();
        return response;
    }
}