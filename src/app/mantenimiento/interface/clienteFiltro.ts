export interface ClienteFiltro {
    id: number,
    idAtributoFuncionalVariedadValor : number,
    valor2 : string,
    idClienteTipoValor: number, 
    idAtributoTecnicoVariedad: number, 
    idCondicion: number, 
    valorCondicion: string, 
    estado: number,
    fechaRegistro: Date
}
export const ClienteFiltroInit: ClienteFiltro = {
    id: 0,
    idAtributoFuncionalVariedadValor : 0,
    valor2 : '',
    idClienteTipoValor: 0, 
    idAtributoTecnicoVariedad: 0, 
    idCondicion: 0, 
    valorCondicion: '', 
    estado: 1,
    fechaRegistro: new Date()
};