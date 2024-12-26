export interface Medicion {
    id: number,
    anio: number,
    mes: number,
    medicion: number,
    estado:number,
    fechaRegistro:string,
    fechaModificacion:string,
}
export const MedicionInit: Medicion = {
    id: 0,
    anio: 0, 
    mes: 0,
    medicion: 0,
    estado:1,
    fechaRegistro:'',
    fechaModificacion:'',
};