export interface IParkingLog {
    id: string;
    slot_id: string;
    car_id: string;
    entering_time: number;
    leaving_time?: number;
}