import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const WorkExperience = sequelize.define(
    "WorkExperience",
    {
        workex_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: { 
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id"
            },
            onDelete: "CASCADE"
        },
        company_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        designation: { 
            type: DataTypes.STRING(255),
            allowNull: false
        },
        start_year: {
            type: DataTypes.INTEGER, 
            allowNull: false,
        },
        start_month: {
            type: DataTypes.ENUM("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"), // Quoted "DEC"
            allowNull: false,
            defaultValue: "JAN"
        },
        end_year: {
            type: DataTypes.INTEGER, 
            allowNull: true,
        },
        end_month: {
            type: DataTypes.ENUM("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"), // Quoted "DEC"
            allowNull: true,
        },
        is_present: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        tableName: "work_experiences",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default WorkExperience;