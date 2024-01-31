import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { Zona } from "../components/tablas/interfaces/zona.interface";
import { Canal } from "../components/tablas/interfaces/canal.interface";
import { TipoEstudio } from "./tipoEstudio";
import { TipoInformeOrden } from "./tipoInformeOrden";

export interface ContratoForm {
    id: number;
    tipoEstudios: number[];
    zonas: number[];
    canals: number[];
    atributoFuncionalVariedads: number[];
    tipoInformeOrdens: number[];
    fechaInicial: string;
    fechaFinal: string;
    diaEntrega: number;
    frecuencias: number;
    extension: number;
  }