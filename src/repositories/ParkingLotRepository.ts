import { IParkingLot, ParkingSize } from "../type/ParkingLot";
import { IParkingLotRepository } from "./types/IParkingLotRepository";
import * as _ from "lodash"
import { Service } from "typedi"
import { database } from "../../src";

@Service()
export class ParkingLotRepository implements IParkingLotRepository {

    private table_name = "parkinglot"

    private queryBuilder() {
        const client = database(this.table_name)
        return client
    }

    public async getParkingLotById (id: string) {
        const client = this.queryBuilder();
        const response = await client.select().where("slot_id", id).first()
        return response;
    }

    public async getFarestPosition() {
        const client = this.queryBuilder();
        const response = await client.select().orderBy("position")
        if (_.isEmpty(response)) {
            return 0;
        }
        return response[response.length - 1].position + 1;
    }

   public async getAll () {
       const client = this.queryBuilder();
       const response = await client.select()
       return response
   }

   public async addParkingLot (data: IParkingLot[]) {
        const client = this.queryBuilder();
        await client.insert(data);
   };

   public async parkingCarById(
       slot_id: string,
       car_id: string
   ) {
        const client = this.queryBuilder();
        await client.update({car_id}).where({slot_id})
   }

   public async emptySlotByCarId(
    car_id: string
   ) {
       const update = {
           car_id: null
       }
        const client = this.queryBuilder();
        await client.update(update).where({car_id})
   }

   public async getParkingLotByCarId(
       car_id: string
   ) {
        const client = this.queryBuilder();
        const response = await client.select().where({car_id}).first()
        return response;
   }

   public async getNearestAvailableParkinglotBySize(
       size: ParkingSize
   ) {
    const availableParkingSize: ParkingSize[] = [ParkingSize.LARGE];
    if (size === ParkingSize.SMALL) {
        availableParkingSize.push(ParkingSize.SMALL, ParkingSize.MEDIUM)
    } else if (size === ParkingSize.MEDIUM) {
        availableParkingSize.push(ParkingSize.MEDIUM)
    }
    const client = this.queryBuilder();
    const response = await client.select().whereIn("size", availableParkingSize).orderBy("position").first()
    return response

   }
}