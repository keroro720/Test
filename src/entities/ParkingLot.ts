export interface IParkingLot {
    parkinglot_id: string;
    car_id?: string | null;
    size: number;
    position: number;
}

export enum ParkingSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}