export interface Zona {
    id: number ,
    codigo:number,
    idTipoZona : number,
    descripcion: string,
    numeroOrden: number,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
}

export const ZonaInit: Zona = {
    id: 0 ,
    codigo:0,
    idTipoZona : 0,
    descripcion: '',
    numeroOrden:0,
    alias1: "",
    alias2: "",
    alias3: "",
    estado: 1
  };
