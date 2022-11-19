import { TrainingSession } from "./training-session";

export interface Training {
    id:number;
    nazwa:string;
    ile_sesji?:number;
    cwiklacz?:string;
    sesje?: TrainingSession[]
}
