class Notificacion {
    constructor(mensaje, usuario) {
        this.mensaje = mensaje;
        this.usuario = usuario;
        this.leida = false;
        this.fechaLeida = null;
    }

    async marcarComoLeida() {
        this.leida = true;
        this.fechaLeida = new Date();
    }
}

export { Notificacion };