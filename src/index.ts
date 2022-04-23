import express from "express";
import "reflect-metadata";
import * as _ from "lodash";
import { useExpressServer } from 'routing-controllers';
import { CarController } from "./routes/CarController";
import { ParkingLogController } from "./routes/ParkingLogsController";
import { ParkingLotController } from "./routes/ParkingLotController";
import * as DotEnv from "dotenv";
import Knex from "knex";
import * as databaseConfig from "../knexfile";


DotEnv.config();

const app = express();

app.use(express.json());

export const database = Knex(databaseConfig);

useExpressServer(app, {
    controllers: [
        CarController,
        ParkingLogController,
        ParkingLotController
    ]
});

app.listen((parseInt(process.env.PORT) || 3000), () => {
    console.log(`App start at port ${process.env.PORT}`);
});
