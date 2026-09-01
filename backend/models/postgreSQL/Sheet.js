import { DataTypes } from "sequelize";
import { sequelize } from "../../config/postgreSQL.js";

const Sheet = sequelize.define(
    "Sheet",
    {
        sheet_id: {
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
            }
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        // problem_ids: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: [],
        // },
        cover_url: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "https://via.placeholder.com/150"
        },
        is_favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
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
        tableName: "sheets",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);

export default Sheet;