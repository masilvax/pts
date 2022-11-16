export interface User {
    login: string;
    token: string;
    lang?: string;
    theme: string;
    trainer:boolean;
    error?:string;
}
