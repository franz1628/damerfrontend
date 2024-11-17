import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { Zona } from "../components/tablas/interfaces/zona.interface";
import { Canal } from "../components/tablas/interfaces/canal.interface";
import { TipoEstudio } from "./tipoEstudio";
import { TipoInformeOrden } from "./tipoInformeOrden";
import { AtributoFuncionalVariedad } from "./atributoFuncionalVariedad";
import { AgrupacionZonas } from "./agrupacionZonas";
import { AgrupacionCanals } from "./agrupacionCanals";
import { ClienteAgrupacionZona } from "./clienteAgrupacionZona";
import { ClienteAgrupacionCanal } from "./clienteAgrupacionCanal";

export interface ContratoForm {
  id: number
  tipoEstudios: number
  zonas: ClienteAgrupacionZona[]
  canals: ClienteAgrupacionCanal[]
  atributoFuncionalVariedads: AtributoFuncionalVariedad[]
  categoriaUnidadVentas: []
  tipoInformeOrdens: TipoInformeOrden[]
  fechaInicial: string
  fechaFinal: string
  diaEntrega: number
  frecuencias: number
  extension: number
  idCliente: number
  idCategoria: number
}

export const ContratoFormInit: ContratoForm = {
  id: 0,
  tipoEstudios: 0,
  zonas: [],
  canals: [],
  atributoFuncionalVariedads: [],
  categoriaUnidadVentas: [],
  tipoInformeOrdens: [],
  fechaInicial: '',
  fechaFinal: '',
  diaEntrega: 0,
  frecuencias: 0,
  extension: 0,
  idCliente: 0,
  idCategoria: 0,
}