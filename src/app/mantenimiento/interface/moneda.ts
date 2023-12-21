export interface Moneda {
    id: number,
    descripcion: string,
    descripcionResumida: string,
    tip: string,
    simbolo: string,
    alias1: string,
    alias2: string,
    alias3: string
}
export const MonedaInit: Moneda = {
    id: 0,
    descripcion: '',
    descripcionResumida: '',
    tip: '',
    simbolo: '',
    alias1: '',
    alias2: '',
    alias3: ''
};