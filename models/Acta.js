import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Vecino from './Vecino.js';

const Acta = sequelize.define('Acta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    archivo_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fecha_asamblea: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    subido_por: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Vecino,
            key: 'id'
        }
    }
},{
    tableName: 'actas',
    timestamps: true,
    createdAt: 'fecha_subida',
    updatedAt: false,
});

Vecino.hasMany(Acta, { foreignKey: 'subido_por' });
Acta.belongsTo(Vecino, { foreignKey: 'subido_por' });

export default Acta;