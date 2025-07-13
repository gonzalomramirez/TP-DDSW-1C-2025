export class Alojamiento {

    constructor(anfitrion, nombre, descripcion, precioPorNoche, moneda, horarioCheckIn, horarioCheckOut, direccion, cantidadMaximaHuespedes, caracteristicas, fotos) {
        this.anfitrion = anfitrion;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precioPorNoche = precioPorNoche;
        this.moneda = moneda;
        this.horarioCheckIn = horarioCheckIn;
        this.horarioCheckOut = horarioCheckOut;
        this.direccion = direccion;
        this.cantidadMaximaHuespedes = cantidadMaximaHuespedes;
        this.caracteristicas = caracteristicas;
        this.reservas = [];
        this.fotos = fotos;
    }

    agregarReserva(reservaId) {
        this.reservas.push(reservaId);
    }

    tuPrecioEstaDentroDe(valorMinimo, valorMaximo) {
        return this.precioPorNoche >= valorMinimo && this.precioPorNoche <= valorMaximo;
    }

    tenesCaracteristica(caracteristica) {
        return this.caracteristicas.some(carac => carac === caracteristica);
    }

    puedenAlojarse(cantHuespedes) {
        return this.cantidadMaximaHuespedes >= cantHuespedes;
    }
}