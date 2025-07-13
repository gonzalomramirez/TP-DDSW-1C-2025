# Despliegue de Birbnb (Docker + Render)

Este documento explica cómo desplegar el proyecto **Birbnb** usando **Docker**, **Docker Hub** y **Render**, tanto en entorno de desarrollo como de producción.

---
## Estructura de carpetas

```
/birbnb
├── /frontend
│   ├── Dockerfile
│   ├── .dockerignore
│   └── /scripts
│       ├── deploy-frontend-dev.sh
│       └── deploy-frontend-prod.sh
├── /backend
│   ├── Dockerfile
│   ├── .dockerignore
│   └── /scripts
│       ├── deploy-backend-dev.sh
│       └── deploy-backend-prod.sh
```

---

## Despliegue en Docker + Render

### Scripts de despliegue

#### Backend (dentro de /backend/scripts)

| Entorno    | Comando                                    |
| ---------- | ------------------------------------------ |
| Desarrollo | `./deploy-backend-dev.sh`  |
| Producción | `./deploy-backend-prod.sh` |

#### Frontend (dentro de /frontend/scripts)

| Entorno    | Comando                                      |
| ---------- | -------------------------------------------- |
| Desarrollo | `./deploy-frontend-dev.sh`  |
| Producción | `./deploy-frontend-prod.sh` |

> Antes de ejecutarlos, hay que correr:
>
> ```bash
> chmod +x backend/scripts/*.sh
> chmod +x frontend/scripts/*.sh
> ```

---

### Configuración en Render

Hay 4 Web Services:

| Servicio             | Imagen Docker                     | Puerto | Variables de entorno                |
| -------------------- | --------------------------------- | ------ | ----------------------------------- |
| birbnb-backend-dev   | `gonramirez/birbnb-backend:dev`   | 3000   | `MONGO_URL`, `NODE_ENV=development` |
| birbnb-backend-prod  | `gonramirez/birbnb-backend:prod`  | 3000   | `MONGO_URL`, `NODE_ENV=production`  |
| birbnb-frontend-dev  | `gonramirez/birbnb-frontend:dev`  | 80     | *(no requiere variables)*           |
| birbnb-frontend-prod | `gonramirez/birbnb-frontend:prod` | 80     | *(no requiere variables)*           |

---

### Flujo de despliegue

```bash
# Backend
./backend/scripts/deploy-backend-dev.sh
./backend/scripts/deploy-backend-prod.sh

# Frontend
./frontend/scripts/deploy-frontend-dev.sh
./frontend/scripts/deploy-frontend-prod.sh
```

Luego, en Render:

- Ir a cada Web Service
- Hacer **Manual Deploy → Clear cache and deploy latest image**

---

## Validaciones post-deploy

### Backend

- Verificar logs en Render para ver conexión a MongoDB
- Acceder a `/swagger` si está disponible

### Frontend

- Acceder a la URL pública
- Abrir DevTools → pestaña Network
- Verificar que las requests vayan al backend correcto

---

## Consideraciones técnicas

- `REACT_APP_API_URL` se embebe en el build de CRA con `--build-arg` (frontend)
- `MONGO_URL` y `NODE_ENV` se leen en tiempo de ejecución (backend)
- El `Dockerfile` de backend ejecuta:
  ```bash
  if NODE_ENV=development → npm run dev
  if NODE_ENV=production → node src/main.js
  ```
- Las imágenes se construyen con `--platform linux/amd64` por compatibilidad con Render

---

## Despliegue local con Docker Compose

### Comando para levantar todo el proyecto

```bash
  docker-compose up --build
```

Expone:

- Frontend en `localhost:4000`
- Backend en `localhost:3000`

### Comandos útiles

```bash
  # Levantar contenedores
  docker-compose up

  # Bajar contenedores
  docker-compose down
```

---
