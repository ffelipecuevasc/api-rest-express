import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Vecino from './Vecino.js';

const Cuota = sequelize.define('Cuota', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vecino_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Vecino',
            key: 'id'
        }
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    mes_correspondiente: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estado_pago: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente'
    },
    comprobante_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fecha_pago: {
        type: DataTypes.DATE,
        allowNull: true
    }
},{
    tableName: 'cuotas',
    timestamps: false
});

// Declaramos las relaciones (Cuota & Vecino) = (N a 1)
Vecino.hasMany(Cuota, {
    foreignKey: 'vecino_id',
    sourceKey: 'id',
});

Cuota.belongsTo(Vecino, {
    foreignKey: 'vecino_id',
    targetKey: 'id',
});

export default Cuota;