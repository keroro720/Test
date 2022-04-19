// import { JsonController, Param, Body, Get, Post, Put, Patch, BodyParam } from 'routing-controllers';
// import { ParkingSize } from '../entities/ParkingLot';
// import { ParkingService } from '../services/ParkingService';
// import { Container } from "typedi"

// @JsonController("/parking")
// export class ParkingController {
//     @Patch("/")
//     public async parkingACar(
//         @BodyParam("plate_id") plate_id: string,
//         @BodyParam("size") size: ParkingSize,
//     ) {
//         const parkingService = Container.get(ParkingService)
//         return parkingService.parkingACar(plate_id, size);
//     }

//     @Post("/:id/leaving")
//     public async leavingALot(
//         @Param("id") id: string
//     ) {
//         const parkingService = Container.get(ParkingService)
//         return parkingService.leavingALot(id);
//     }
// }