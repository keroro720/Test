import { ICar } from "../type/Car";
import { ICarRepository } from "./types/ICarRepository";
import { Service } from "typedi"
import { ParkingSize } from "../type/ParkingLot";
import { database } from "../../src";

@Service()
export class CarRepository implements ICarRepository {

    private table_name = "car"

    private queryBuilder() {
        const client = database(this.table_name)
        return client
    }

    public async getCarById (plate_id: string): Promise<ICar> {
        const client = this.queryBuilder();
        const response = await client.select().where({plate_id}).first()
        return response;
    }

    public async getCarsBySize (size: ParkingSize) {
        const client = this.queryBuilder();
        const response = await client.select().where({size});
        return response;
    };

    public async getAll() {
        const client = this.queryBuilder();
        const response = await client.select();
        return response;
    }

    public async addCar (data: ICar) {
        const client = this.queryBuilder();
        await client.insert(data);
    };
}