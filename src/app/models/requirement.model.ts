import { Patient } from "./patient.model";

export class Requirement {
    patient: Patient;
    requiredAt: Date;
    type: string;
    status: Boolean
}
