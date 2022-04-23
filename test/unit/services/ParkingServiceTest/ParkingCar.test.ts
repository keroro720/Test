import { suite, test } from "@testdeck/mocha";
import { CarRepository } from "src/repositories/CarRepository";
import Container from "typedi";
import { MockCarRepository } from "../../repositories/MockCarRepository";
import chai, { expect } from "chai";
import { CarService } from "src/services/CarService";
import { ParkingSize } from "src/type/ParkingLot";
import chaiAsPromised from "chai-as-promised";
import { ParkingLotRepository } from "src/repositories/ParkingLotRepository";
import { MockParkingLotRepository } from "../../repositories/MockParkingLotRepository";
import { MockParkingLogRepository } from "../../repositories/MockParkingLogRepository";
import { ParkingLogRepository } from "src/repositories/ParkingLogRepository";
import { ParkingService } from "src/services/ParkingService";

export const ParkingCarTest = () => {
    @suite("parking a car")
    class ParkingACar {
        public before() {
            chai.should();
            chai.use(chaiAsPromised);
            Container.set(CarRepository, new MockCarRepository());
            Container.set(ParkingLotRepository, new MockParkingLotRepository());
            Container.set(ParkingLogRepository, new MockParkingLogRepository());
        }
        public async after() {
            Container.reset();
        }
        @test("can park a car")
        public async canRegistercar() {
            const parkingService = Container.get(ParkingService);
            const response = await parkingService.parkingACar(
                "AU1234",
                ParkingSize.MEDIUM
            );
            expect(response).equal('Your parking lot is 5678');
        }
        @test("can't park a car while your car is parking")
        public async canNotParkACarWhileCarIsParking() {
            const parkingService = Container.get(ParkingService);
            await parkingService.parkingACar(
                "AU91011",
                ParkingSize.MEDIUM
            ).should.rejected;
        }
    }
};