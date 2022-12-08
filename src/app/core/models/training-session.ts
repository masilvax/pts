import { Exercise } from "./exercise";

export interface TrainingSession {
    id: number;
    nazwa: string;
    data:string;
    cwiczenia?:Exercise[]
}
