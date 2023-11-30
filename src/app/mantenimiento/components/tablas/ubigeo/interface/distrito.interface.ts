export interface Distrito {
    id: number ,
    codigo:number,
    descripcion: string,
    idProvincia:number,
    estado: number
}

export const DistritoInit: Distrito = {
    id: 0 ,
    codigo:0,
    descripcion: '',
    idProvincia:0,
    estado: 1
  };
