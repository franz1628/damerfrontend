export interface TipoUrbanizacion {
    id: number ,
    codigo:number,
    descripcion: string,
    descripcionResumida: string,
    estado: number
}

export const TipoUrbanizacionInit: TipoUrbanizacion = {
    id: 0 ,
    codigo:0,
    descripcion: '',
    descripcionResumida:'',
    estado: 1
  };
