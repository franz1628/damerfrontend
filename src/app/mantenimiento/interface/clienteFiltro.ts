export interface ClienteFiltro {
    id: number,
    idAtributoFuncionalVariedadValor: number,
    condicion :number,
    valor1 :number,
    valor2 :number,
    estado: number,
    fechaRegistro: Date
}
export const ClienteFiltroInit: ClienteFiltro = {
    id: 0,
    idAtributoFuncionalVariedadValor: 0,
    condicion :0,
    valor1 :0,
    valor2 :0,
    estado: 0,
    fechaRegistro: new Date()
};