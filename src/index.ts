import express, {Application, Request, Response} from "express"
import "reflect-metadata"
import * as _ from "lodash";
import { useExpressServer } from 'routing-controllers';
import { CarController } from "./routes/CarController";
// import { ParkingController } from "./routes/ParkingController";
import { ParkingLogController } from "./routes/ParkingLogsController";
import { ParkingLotController } from "./routes/ParkingLotController";

const app = express()

app.use(express.json());

useExpressServer(app, {
    controllers: [
        CarController,
        // ParkingController,
        ParkingLogController,
        ParkingLotController
    ]
})

app.listen(3000, () => {
    console.log("App start at port 3000")
})
