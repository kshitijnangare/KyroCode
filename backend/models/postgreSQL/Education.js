import { sequelize } from "../../config/database.js";
import { DataTypes } from "sequelize";

const Education = sequelize.define(
    "Education",
    {
        education_id: {
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
        institute_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "institutes",
                key: "institute_id"
            }
        },
        // institute_name: {
        //     type: DataTypes.STRING(255),
        //     allowNull: false,
        // },
        degree: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        start_year: { 
            type: DataTypes.INTEGER,
            allowNull: false
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
        tableName: "educations",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Education;