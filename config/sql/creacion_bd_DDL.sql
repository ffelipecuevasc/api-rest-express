-- 1. Crear la base de datos
CREATE
DATABASE junta_vecinos_db;

-- 1. Tabla de Vecinos (Usuarios del sistema)
CREATE TABLE vecinos
(
    id              SERIAL PRIMARY KEY,
    rut             VARCHAR(12) UNIQUE  NOT NULL,
    nombre_completo VARCHAR(150)        NOT NULL,
    email           VARCHAR(150) UNIQUE NOT NULL,
    password_hash   VARCHAR(255)        NOT NULL,
    rol             VARCHAR(20)         NOT NULL DEFAULT 'vecino', -- Roles esperados: 'vecino' o 'directiva'
    fecha_registro  TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Cuotas Sociales (Pagos)
CREATE TABLE cuotas
(
    id                  SERIAL PRIMARY KEY,
    vecino_id           INT            NOT NULL,
    monto               DECIMAL(10, 2) NOT NULL,
    mes_correspondiente DATE           NOT NULL,
    estado_pago         VARCHAR(20)    NOT NULL DEFAULT 'pendiente', -- Estados: 'pendiente', 'pagado'
    comprobante_url     VARCHAR(255),                                -- Ruta del archivo subido vía express-fileupload
    fecha_pago          TIMESTAMP,
    -- La llave foránea no tiene ON DELETE CASCADE para que la secuencia de eliminación
    -- multi-paso se controle estrictamente desde la capa de servicios bajo una transacción.
    CONSTRAINT fk_cuota_vecino FOREIGN KEY (vecino_id) REFERENCES vecinos (id)
);

-- 3. Tabla de Actas de Asamblea (Documentos)
CREATE TABLE actas
(
    id             SERIAL PRIMARY KEY,
    titulo         VARCHAR(150) NOT NULL,
    resumen        TEXT,
    archivo_url    VARCHAR(255) NOT NULL, -- Ruta del PDF del acta
    fecha_asamblea DATE         NOT NULL,
    subido_por     INT          NOT NULL,
    fecha_subida   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_acta_vecino FOREIGN KEY (subido_por) REFERENCES vecinos (id)
);

-- 4. Tabla de Métricas Históricas y Estadísticas
-- Destinada a salvaguardar datos analíticos antes de ejecutar borrados físicos de vecinos o cuotas.
CREATE TABLE metricas_historicas
(
    id             SERIAL PRIMARY KEY,
    categoria      VARCHAR(50) NOT NULL, -- Ej: 'fondos_recaudados_historicos', 'vecinos_retirados'
    valor          NUMERIC     NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    detalles       JSONB                 -- Almacenamiento flexible para el contexto del dato consolidado
);