export interface Departamento {
    id: number ,
    descripcion: string,
    idPais:number,
    estado: number
}

export const DepartamentoInit: Departamento = {
    id: 0 ,
    descripcion: '',
    idPais:1004,
    estado: 1
  };
