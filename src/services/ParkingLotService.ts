import * as _ from "lodash";
import { IParkingLot, ParkingSize } from "../type/ParkingLot";
import { uuid } from 'uuidv4';
import { mappingSizeByNumber } from "../util/helper";
import { Service, Inject } from "typedi";
import { ParkingLotRepository } from "../repositories/ParkingLotRepository";
import { CarService } from "./CarService";

@Service()
export class ParkingLotService {

    @Inject(() => CarService)
    private _carService: CarService;

    @Inject(() => ParkingLotRepository)
    private _parkingLotRepository!: ParkingLotRepository;


    public async createParkingLot(slot: number) {
      try {
        const farestPosition = await this._parkingLotRepository.getFarestPosition();
        const parkingLots: IParkingLot[] = [];
          for (let i = farestPosition; i < slot + farestPosition; i++) {
              const randomSize = Math.floor(Math.random() * 3);
              parkingLots.push(
                  {
                      slot_id: uuid(),
                      size: mappingSizeByNumber(randomSize),
                      position: i,
                      car_id: null,
                  }
              );
            }
          await this._parkingLotRepository.addParkingLot(parkingLots);
          const response = await this.getAllParkingLot();
          return response;
      } catch(error) {
        console.log("Create parking lot error", error);
        throw {
          status: 500,
          message: "Internal servicer error"
        };
      }
    }

    public async getAllParkingLot() {
      try {
        const allLot = await this._parkingLotRepository.getAll();
        return allLot.map(lot => {
          return {
            ...lot,
            status: lot.car_id ? "unavailable" : "available"
          };
        });
      } catch(error) {
        console.log("Get all parking lot error", error);
        throw {
          status: 500,
          message: "Internal servicer error"
        };
      }
    }

    public async getParkingLotById(id: string) {
      try {
        const response = await this._parkingLotRepository.getParkingLotById(id);
        if (response) {
          return {
            ...response,
            status: response.car_id ? "unavailable" : "available"
          };
        } else {
        throw {
          status: 404,
          message: "Parking lot not found"
        };
      }
      } catch(error) {
        console.log("Get parking lot by id error: ", error);
        if (error.status !== 404) {
          throw {
            status: 500,
            message: "Internal servicer error"
          };
        } else {
          throw {
            status: error.status,
            message: error.message
          };
        }
      }
    }

    public async getParkingLotStatusById(id: string) {
      const parkingLotById = await this.getParkingLotById(id);
      return parkingLotById.car_id ? "unavailable" : "available";
    }

    public async getSlotNumberByCarSize(size: ParkingSize) {
      try {
        const allCarIdBySize = await this._carService.getCarPlateListBySize(size);
        const allParkingLots = await this.getAllParkingLot();
        return allParkingLots.filter(parkingLot => {
          return _.includes(allCarIdBySize, parkingLot.car_id);
        });
      } catch(error) {
        throw {
          status: 500,
          message: "Internal servicer error"
        };
      }
    }
}