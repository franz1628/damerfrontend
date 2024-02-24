export interface Urbanizacion {
    id: number ,
    descripcion: string,
    idDistrito:number,
    estado: number
}

export const UrbanizacionInit: Urbanizacion = {
    id: 0 ,
    descripcion: '',
    idDistrito:0,
    estado: 1
  };
