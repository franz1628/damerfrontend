export interface FactorPenetracion {
    id: number,
    idZona: number,
    idCanal: number,
    idCategoria: number,
    valor:number,    
    estado: number,
    idMedicion:number,
    fechaRegistro: string,
    fechaModificacion:string
    
}
export const FactorPenetracionInit: FactorPenetracion = {
    id: 0,
    idZona: 0,
    idCanal: 0,
    idCategoria: 0,
    valor:0,    
    estado: 1,
    idMedicion:0,
    fechaRegistro:'',
    fechaModificacion:'',
};