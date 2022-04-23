export interface IParkingLot {
    slot_id: string;
    car_id?: string | null;
    size: ParkingSize;
    position: number;
}

export enum ParkingSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}