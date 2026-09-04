import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vecino = sequelize.define('Vecino', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut: {
        type: DataTypes.STRING(12),
        unique: true,
        allowNull: false
    },
    nombre_completo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'vecino',
    }
},{
    tableName: 'vecinos',
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: false,
});

export default Vecino;