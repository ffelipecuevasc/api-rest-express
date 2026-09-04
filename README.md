# API REST - Junta de Vecinos

API REST construida con **Express.js** y **PostgreSQL** (vía Sequelize) para la gestión de una junta de vecinos: registro de residentes, cuotas sociales, actas de asamblea y métricas históricas.

## 🛠️ Stack

- **Node.js** + **Express 4** (ES Modules)
- **PostgreSQL** con **Sequelize** como ORM
- **dotenv** para variables de entorno
- **morgan** para logging de requests
- **pnpm** como gestor de paquetes

## 📁 Estructura

```
api-rest-express/
├── app.js                      # Configuración principal de Express
├── bin/www                     # Punto de arranque del servidor (conecta DB + levanta HTTP)
├── config/
│   ├── database.js             # Conexión Sequelize a PostgreSQL
│   └── sql/creacion_bd_DDL.sql # Script DDL de la base de datos
├── routes/
│   └── index.js                # Rutas de la API
└── public/                     # Archivos estáticos
```

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/ffelipecuevasc/api-rest-express.git
cd api-rest-express

# Instalar dependencias
pnpm install
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz con tus credenciales de PostgreSQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=junta_vecinos_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
```

## 🗄️ Base de datos

Ejecuta el script DDL para crear la base de datos y sus tablas:

```bash
psql -U tu_usuario -f config/sql/creacion_bd_DDL.sql
```

Tablas principales:

| Tabla                 | Descripción                                       |
|-----------------------|----------------------------------------------------|
| `vecinos`              | Usuarios del sistema (roles: `vecino`, `directiva`) |
| `cuotas`               | Cuotas sociales y su estado de pago                |
| `actas`                | Actas de asamblea (PDFs)                           |
| `metricas_historicas`  | Datos analíticos previos a borrados físicos        |

## ▶️ Uso

```bash
pnpm start
```

El servidor se levanta en `http://localhost:3000` (o el puerto definido en `.env`), verificando primero la conexión a la base de datos.

## 📡 Endpoints

| Método | Ruta | Descripción                              |
|--------|------|-------------------------------------------|
| GET    | `/`  | Verifica que la API está funcionando      |

> Proyecto en desarrollo — más endpoints (vecinos, cuotas, actas) se irán agregando progresivamente.