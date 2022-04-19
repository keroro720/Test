import { JsonController, Param, Body, Get, Post, Put, Patch, BodyParam } from 'routing-controllers';
import { ParkingLogsService } from '../services/ParkingLogsService';
import { Container } from "typedi"

@JsonController("/parkinglogs")
export class ParkingLogController {
    @Get("/")
    public async parkinglogList(
    ) {
        const parkingLogService = Container.get(ParkingLogsService)
        return parkingLogService.getAllLog();
    }

    @Get("/:id/plate")
    public async parkinglogListByPlateId(
        @Param("id") id: string
    ) {
        const parkingLogService = Container.get(ParkingLogsService)
        return parkingLogService.getLogsByPlateId(id);
    }

    @Get("/:id/slot")
    public async parkinglogListBySlotId(
        @Param("id") id: string
    ) {
        const parkingLogService = Container.get(ParkingLogsService)
        return parkingLogService.getLogsBySlotId(id);
    }

}