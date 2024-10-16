export interface Cliente {
    id: number,
    codigo: number,
    area:string,
    idPais: number,
    razonSocial: string,
    razonSocialAbreviada: string,
    razonSocialTip: string,
    ruc: string,
    razonSocialCorporativa: string,
    codigoRubro: string,
    idCategorizacionCliente: number,
    aniversario: Date,
    web: string,
    mesCierre: number,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
    fechaRegistro: Date,
    fechaModificacion:string
    
}
export const ClienteInit: Cliente = {
    id: 0,
    codigo: 0,
    area:'',
    idPais: 0,
    razonSocial: '',
    razonSocialAbreviada: '',
    razonSocialTip: '',
    ruc: '',
    razonSocialCorporativa: '',
    codigoRubro: '',
    idCategorizacionCliente: 0,
    aniversario: new Date(),
    web: '',
    mesCierre: 0,
    alias1: '',
    alias2: '',
    alias3: '',
    estado: 1,
    fechaRegistro: new Date(),
    fechaModificacion:''
};