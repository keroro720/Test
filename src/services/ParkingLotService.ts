import * as _ from "lodash";
import { IParkingLot, ParkingSize } from "../entities/ParkingLot";
import { uuid } from 'uuidv4';
import dayjs from "dayjs";
import { IParkingLog } from "../entities/ParkingLog";
import { mappingSize, mappingSizeByNumber } from "../util/helper";
import { ICar } from "../entities/Car";
import { Service, Inject } from "typedi"
import { ParkingLotRepository } from "../repositories/ParkingLotRepository";

@Service()
export class ParkingLotService {

    private parkingLots: IParkingLot[] = [];

    private cars: ICar[] = [];

    @Inject(() => ParkingLotRepository)
    private _parkingLotRepository!: ParkingLotRepository


    public async createParkingLot(slot: number) {
      const farestPosition = await this._parkingLotRepository.getFarestPosition()
      const parkingLots: IParkingLot[] = []
        for (let i = farestPosition; i < slot + farestPosition; i++) {
            const randomSize = Math.floor(Math.random() * 3)
            parkingLots.push(
                {
                    parkinglot_id: uuid(),
                    size: randomSize,
                    position: i,
                    car_id: null,
                }
            )
          }
        await this._parkingLotRepository.addParkingLot(parkingLots)
        const response = await this._parkingLotRepository.getAll()
        return response.map(each => {
          return {
            ...each,
            size: mappingSizeByNumber(each.size)
          }
        })
    }

    public async getAllParkingLot() {
      return this._parkingLotRepository.getAll()
    }

    public async getParkingLotById(id: string) {
      const response = await this._parkingLotRepository.getParkingLotById(id);
      if (response) {
      return {
        ...response,
        size: mappingSizeByNumber(response.size)
      }
    } else {
      throw {
        status: 404,
        message: "Parking lot not found"
      }
    }
    }

    public async getParkingLotStatusById(id: string) {
      const parkingLotById = await this.getParkingLotById(id)
      return parkingLotById.car_id ? "unavailable" : "available"
    }

    public async getSlotNumberByCarSize(size: ParkingSize) {
      const sizeNumber = mappingSize(size)
      const allCarIdBySize = this.cars.filter(car => {
        return car.size === sizeNumber
      }).map((car) => {return car.plate_id})
      return this.parkingLots.filter(parkingLot => {
        return _.includes(allCarIdBySize, parkingLot.car_id); 
      })
    }
   
}