import { Sku, SkuInit } from "./sku.interface";


export interface SkuHijos {
    id: number,
    idSku: number,
    idSkuPadre: number,
    cantidad: number,
    porcentaje: number,
    Sku:Sku
}

export const SkuHijosInit: SkuHijos = {
    id: 0,
    idSku: 0,
    idSkuPadre: 0,
    cantidad: 0,
    porcentaje:0,
    Sku:SkuInit
};
