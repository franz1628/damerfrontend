export interface Negocio {
    codigo: number,
    ruc: string,
    nombreComercial: string,
    nombreResumido: string,
    nombreTip: string,
    codCanal: number,
    codZona: number,
    direccion: string,
    codDistrito: number,
    codUrb: number,
    codRuta: number,
    lat: string,
    lgn: string,
    estado: number,
    fechaRegistro: Date,
    fechaActualiza: Date,
    entregaFactura: number,
    levantarNegocio: number,
    negocioEquivalente: number,
    telefono: string,
    fax: string,
    referencia: string,
    zonaAccidentada: number,
    zonaRiesgo: number,
    aceptaProductos: number,
    tipoHorario: number,
    codVia: number,
    numeroDomicilio: number,
    interior: string,
    manzana: string,
    lote: string,
}

export const NegocioInit: Negocio = {
    codigo: 0,
    ruc: '',
    nombreComercial: '',
    nombreResumido: '',
    nombreTip: '',
    codCanal: 0,
    codZona: 0,
    direccion: '',
    codDistrito: 0,
    codUrb: 0,
    codRuta: 0,
    lat: '',
    lgn: '',
    estado: 0,
    fechaRegistro: new Date(),
    fechaActualiza: new Date(),
    entregaFactura: 0,
    levantarNegocio: 0,
    negocioEquivalente: 0,
    telefono: '',
    fax: '',
    referencia: '',
    zonaAccidentada: 0,
    zonaRiesgo: 0,
    aceptaProductos: 0,
    tipoHorario: 0,
    codVia: 0,
    numeroDomicilio: 0,
    interior: '',
    manzana: '',
    lote: ''
  };

  