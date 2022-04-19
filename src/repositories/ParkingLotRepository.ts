import { IParkingLot } from "../entities/ParkingLot";
import { IParkingLotRepository } from "./types/IParkingLotRepository";
import * as _ from "lodash"
import { Service } from "typedi"

@Service()
export class ParkingLotRepository implements IParkingLotRepository {

    private parkinglots:IParkingLot[] = []

    public async getParkingLotById (id: string) {
        const result = this.parkinglots.find(parkinglot => {
            return parkinglot.parkinglot_id === id
        })
        return result!;
    }

    public async getFarestPosition() {
        if (_.isEmpty(this.parkinglots)) {
            return 0;
        }
        const response = _.sortBy(this.parkinglots, "position")
        return response[response.length - 1].position + 1;
    }

   public async getAll () {
       return this.parkinglots
   }

   public async addParkingLot (data: IParkingLot[]) {
       this.parkinglots = _.concat(this.parkinglots, data);
   };

   public async parkingCarById(
       id: string,
       car_id: string
   ) {
        const index = this.parkinglots.findIndex(parkinglot => {
            return parkinglot.parkinglot_id === id
        })
        this.parkinglots[index].car_id = car_id
   }

   public async emptyCarByCarId(
    car_id: string
   ) {
    const index = this.parkinglots.findIndex(parkinglot => {
        return parkinglot.car_id === car_id
    })
    this.parkinglots[index].car_id = null
   }

   public async getParkingLotByCarId(
       car_id: string
   ) {
    const index = this.parkinglots.findIndex(parkinglot => {
        return parkinglot.car_id === car_id
    })
    return this.parkinglots[index]
   }

   public async getNearestAvailableParkinglotBySize(
       size: number
   ) {
    const sorted = _.sortBy(this.parkinglots, "position")
    const nearest = sorted.find(each => {
        return !each.car_id && each.size >= size
    })
    return nearest
   }
}