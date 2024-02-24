export interface AtributoTecnicoVariedadValor {
    id: number,
    idAtributoTecnicoVariedad : number,
	valor : string,
	comentario : string,
	alias1 : string,
	idConvenio : number,
    estado: number,
    fechaRegistro: Date

}
export const AtributoTecnicoVariedadValorInit: AtributoTecnicoVariedadValor = {
    id: 0,
    idAtributoTecnicoVariedad : 0,
	valor : '',
	comentario : '', 
	alias1 : '',
	idConvenio : 0,
    estado: 1,
    fechaRegistro: new Date()
};