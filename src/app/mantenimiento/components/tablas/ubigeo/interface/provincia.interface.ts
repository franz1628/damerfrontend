export interface Provincia {
    id: number ,
    descripcion: string,
    idDepartamento:number,
    estado: number
}

export const ProvinciaInit: Provincia = {
    id: 0 ,
    descripcion: '',
    idDepartamento:0,
    estado: 1
  };
