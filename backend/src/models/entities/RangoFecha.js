export class RangoFecha {
    constructor(fechaInicio, fechaFin) {
        this.fechaInicio = new Date(fechaInicio);
        this.fechaFin = new Date(fechaFin);
    }

    seSolapaCon(otroRango) {
        return (
            this.fechaInicio <= otroRango.fechaFin &&
            this.fechaFin >= otroRango.fechaInicio
        );
    }
}