export interface Canal {
    id: number ,
    codigo:number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    factorRecargo: number,
    avancePermNego: number,
    avancePermProsp: number,
    tieneExhibidor: number,
    alias1: string,
    alias2: string,
    alias3: string,
    estado: number,
}

export const CanalInit: Canal = {
    id: 0 ,
    codigo:0,
    descripcion: '',
    descripcionResumida:'',
    tip:'',
    factorRecargo: 1,
    avancePermNego: 80,
    avancePermProsp: 90,
    tieneExhibidor: 1,
    alias1: "",
    alias2: "",
    alias3: "",
    estado: 1
  };
