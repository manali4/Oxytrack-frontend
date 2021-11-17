import { Patient } from "./patient.model";

export class Cylinder {
    id: number;
    addedAt: Date;
    identifier: string;
    status: string;
    currentCapacity: String;
    totalCapacity: string;
    patients: Patient[];
}
