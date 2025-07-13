export class Usuario {
    constructor(tipo, nombre, email) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.email = email;
    }

    esAnfitrion() {
        return this.tipo === 'ANFITRION';
    }
}