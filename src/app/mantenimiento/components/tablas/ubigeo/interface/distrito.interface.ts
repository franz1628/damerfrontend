export interface Distrito {
    id: number ,
    descripcion: string,
    idProvincia:number,
    estado: number
}

export const DistritoInit: Distrito = {
    id: 0 ,
    descripcion: '',
    idProvincia:0,
    estado: 1
  };
