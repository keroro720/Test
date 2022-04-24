import { IsNumber } from "class-validator";
export class CreateParkingLotRequest {
    @IsNumber()
    public slot: number;
}