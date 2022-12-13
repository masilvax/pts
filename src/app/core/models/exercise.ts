export interface Exercise {
    id:number,
    nazwa_krotka:string,
    nazwa?:string,
    id_sesji:number,
    kolejnosc?:number,
    kolejnoscWysw?:number,
    litera?:string,
    serie:number,
    powt:number[],
    ciezar:number[],
    zrobione:number[],
    superset: number,
    jedn_intens:string,
    przerwy_serie?:number,
    przerwa_po?:number
}
