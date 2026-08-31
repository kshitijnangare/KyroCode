import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

const Institute = sequelize.define(
    "Institute",
    {
        institute_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        institute_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        // institute_city: {}
        number_of_students: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "institutes",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

export default Institute;