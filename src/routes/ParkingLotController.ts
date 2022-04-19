import { JsonController, Param, Body, Get, Post, Put, Patch, BodyParam } from 'routing-controllers';
import { ParkingSize } from '../entities/ParkingLot';
import { ParkingLotService } from '../services/ParkingLotService';
import { Container } from "typedi"

@JsonController("/parkinglot")
export class ParkingLotController {
    @Post("/")
    public async createParkingLot(
        @BodyParam("slot") slot: number,
    ) {
        const parkingLotsService = Container.get(ParkingLotService)
        return parkingLotsService.createParkingLot(slot);
    }

    @Get("/")
    public async getAllParkingLot() {
        const parkingLotsService = Container.get(ParkingLotService)
        return parkingLotsService.getAllParkingLot();
    }

    @Get("/:id")
    public async getParkingLotById(
        @Param("id") id: string
    ) {
        const parkingLotsService = Container.get(ParkingLotService)
        return parkingLotsService.getParkingLotById(id);
    }

    @Get("/:id/status")
    public async getParkingLotStatusById(
        @Param("id") id: string
    ) {
        const parkingLotsService = Container.get(ParkingLotService)
        return parkingLotsService.getParkingLotStatusById(id);
    }

    @Get("slot/:size")
    public async getSlotNumberByCarSize(
        @Param("size") size: ParkingSize
    ) {
        const parkingLotsService = Container.get(ParkingLotService)
        return parkingLotsService.getSlotNumberByCarSize(size);
    }
}