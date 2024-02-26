import { AtributoTecnicoVariedad, AtributoTecnicoVariedadInit } from "../../../interface/atributoTecnicoVariedad";

export interface CategoriaAtributoTecnico {
    id:number,
    idCategoria : number ,
    idAtributoTecnicoVariedad:number,
	comentario : string ,
	idTipoUnidadMedida : number ,
	numOrdenSku : string ,
	indVerificado : number ,
    estado: number,
    fechaRegistro: Date,
    AtributoTecnicoVariedad:AtributoTecnicoVariedad
}

export const CategoriaAtributoTecnicoInit: CategoriaAtributoTecnico = {
    id: 0,
    idCategoria: 0,
    idAtributoTecnicoVariedad: 0,
    comentario: "",
    idTipoUnidadMedida: 0,
    numOrdenSku: "",
    indVerificado: 0,
    estado: 1,
    fechaRegistro: new Date(),
    AtributoTecnicoVariedad: AtributoTecnicoVariedadInit,
};
