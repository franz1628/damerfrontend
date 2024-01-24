
import { Canal, CanalInit } from "../components/tablas/interfaces/canal.interface";
import { Cliente, ClienteInit } from "./cliente";

export interface TipoEstudio {
    id: number,
    codigo :  number,
    descripcion :  string,
    descripcionResumida :  string,
    tip :  string,
    intTipoProyeccion :  number,
    intPrioridadLevantamiento :  number,
    indicarSolicitarBandeja :  number,
    indicarUtilizarMuestra :  number,
    especificarAtributo :  number,
    indicarEspecificarSku :  number,
    indicarMuestraReal :  number,
    alias1 :  string,
    alias2 :  string,
    alias3 :  string,
    fechaRegistro: Date,
    estado : number,
}
export const TipoEstudioInit: TipoEstudio = {
    id: 0,
    codigo :  0,
    descripcion :  'string',
    descripcionResumida :  'string',
    tip :  'string',
    intTipoProyeccion :  0,
    intPrioridadLevantamiento :  0,
    indicarSolicitarBandeja :  0,
    indicarUtilizarMuestra :  0,
    especificarAtributo :  0,
    indicarEspecificarSku :  0,
    indicarMuestraReal :  0,
    alias1 :  'string',
    alias2 :  'string',
    alias3 :  'string',
    fechaRegistro: new Date(),
    estado : 1,
};