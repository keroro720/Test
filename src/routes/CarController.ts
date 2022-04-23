import { JsonController, Param, Body, Get, Post, Put, Patch, BodyParam, HttpCode } from 'routing-controllers';
import { ParkingSize } from '../type/ParkingLot';
import { CarService } from '../services/CarService';
import { Container, Inject } from "typedi";
import { ParkingService } from '../services/ParkingService';

@JsonController("/cars")
export class CarController {

    @Get("/")
    public async getAll() {
        const carService = Container.get(CarService);
        return carService.getAll();
    }

    @Get("/plates/:size")
    public async getPlateListBySize(
        @Param("size") size: ParkingSize
    ) {
        const carService = Container.get(CarService);
        return carService.getCarPlateListBySize(size);
    }

    @Post("/parking")
    public async parkingACar(
        @BodyParam("plate_id") plate_id: string,
        @BodyParam("size") size: ParkingSize,
    ) {
        const parkingService = Container.get(ParkingService);
        return parkingService.parkingACar(plate_id, size);
    }

    @Post("/:id/leaving")
    public async leavingALot(
        @Param("id") id: string
    ) {
        const parkingService = Container.get(ParkingService);
        return parkingService.leavingALot(id);
    }
}