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

export const LeavingLotTest = () => {
    @suite("leaving a lot")
    class LeavingALot {
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
        @test("can leave a lot")
        public async canRegistercar() {
            const parkingService = Container.get(ParkingService);
            const response = await parkingService.leavingALot(
                "AU91011",
            );
            expect(response).equal('AU91011 is leaving');
        }
        @test("can't leave a lot cause not parking")
        public async canNotParkACarWhileCarIsParking() {
            const parkingService = Container.get(ParkingService);
            await parkingService.leavingALot(
                "AU12345",
            ).should.rejected;
        }
    }
};