import * as _ from "lodash";
import { Service } from "typedi";
import { IParkingLot, ParkingSize } from "../../../src/type/ParkingLot";
import { IParkingLotRepository } from "../../../src/repositories/types/IParkingLotRepository";

@Service()
export class MockParkingLotRepository implements IParkingLotRepository {
    private parkinglots:IParkingLot[] = [
        {
            slot_id: "1234",
            car_id: null,
            size: ParkingSize.SMALL,
            position: 0
        },
        {
            slot_id: "5678",
            car_id: null,
            size: ParkingSize.MEDIUM,
            position: 1
        },
        {
            slot_id: "9101112",
            car_id: "AU91011",
            size: ParkingSize.LARGE,
            position: 2
        }
    ];

    public async getParkingLotById (id: string) {
        const result = this.parkinglots.find(parkinglot => {
            return parkinglot.slot_id === id;
        });
        return result!;
    }

    public async getFarestPosition() {
        if (_.isEmpty(this.parkinglots)) {
            return 0;
        }
        const response = _.sortBy(this.parkinglots, "position");
        return response[response.length - 1].position + 1;
    }

   public async getAll () {
       return this.parkinglots;
   }

   public async addParkingLot (data: IParkingLot[]) {
       this.parkinglots = _.concat(this.parkinglots, data);
   }

   public async parkingCarById(
       id: string,
       car_id: string
   ) {
        const index = this.parkinglots.findIndex(parkinglot => {
            return parkinglot.slot_id === id;
        });
        this.parkinglots[index].car_id = car_id;
   }

   public async emptySlotByCarId(
    car_id: string
   ) {
    const index = this.parkinglots.findIndex(parkinglot => {
        return parkinglot.car_id === car_id;
    });
    this.parkinglots[index].car_id = null;
   }

   public async getParkingLotByCarId(
       car_id: string
   ) {
    const index = this.parkinglots.findIndex(parkinglot => {
        return parkinglot.car_id === car_id;
    });
    return this.parkinglots[index];
   }

   public async getNearestAvailableParkinglotBySize(
       size: ParkingSize
   ) {
    const sorted = _.sortBy(this.parkinglots, "position");
    const availableParkingSize: ParkingSize[] = [ParkingSize.LARGE];
    if (size === ParkingSize.SMALL) {
        availableParkingSize.push(ParkingSize.SMALL, ParkingSize.MEDIUM);
    } else if (size === ParkingSize.MEDIUM) {
        availableParkingSize.push(ParkingSize.MEDIUM);
    }
    const nearest = sorted.find(each => {
        return !each.car_id && _.includes(availableParkingSize, each.size);
    });
    return nearest;
   }
}