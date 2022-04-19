import { IParkingLog } from "../../entities/ParkingLog";

export interface IParkingLogRepository {
    getAllLog: () => Promise<IParkingLog[]>
    addLog: (data: IParkingLog) => Promise<void>
    editLeavingTimeById: (id: string, leavingTime: number) => Promise<void>
    getLogByPlateId: (plate_id: string) => Promise<IParkingLog[]>
    getLogBySlotId: (slot_id: string) => Promise<IParkingLog[]>
}