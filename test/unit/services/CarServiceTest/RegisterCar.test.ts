import { suite, test } from "@testdeck/mocha"
import { CarRepository } from "src/repositories/CarRepository";
import Container from "typedi";
import { MockCarRepository } from "../../repositories/MockCarRepository";
import chai, { expect } from "chai";
import { CarService } from "src/services/CarService";
import { ParkingSize } from "src/type/ParkingLot";
import chaiAsPromised from "chai-as-promised";

export const RegisterCarTest = () => {
    @suite("register a car")
    class RegisterCarTest {
        public before() {
            chai.should();
            chai.use(chaiAsPromised);
            Container.set(CarRepository, new MockCarRepository());
        }
        public async after() {
            Container.reset();
        }
        @test("can register a car")
        public async canRegistercar() {
            const carService = Container.get(CarService);
            const response = await carService.registerCar(
                "AU1234",
                ParkingSize.SMALL
            )
            expect(response).to.deep.equal({
                plate_id: "AU1234",
                size: ParkingSize.SMALL
            })
        }
        @test("can't register a car: same plate_id but differ size")
        public async canNotRegisterCarDifferSize() {
            const carService = Container.get(CarService);
            await carService.registerCar(
                "AU123",
                ParkingSize.SMALL
            ).should.rejected
        }
    }
}