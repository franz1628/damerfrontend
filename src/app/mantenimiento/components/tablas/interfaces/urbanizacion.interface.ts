export interface Urbanizacion {
    id: number ,
    idDistrito:number,
    descripcion: string,
    estado: number,
}

export const UrbanizacionInit: Urbanizacion = {
    id: 0 ,
    idDistrito:0,
    descripcion: '',
    estado: 1
  };
