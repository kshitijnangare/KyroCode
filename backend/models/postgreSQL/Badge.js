import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const Badge = sequelize.define(
    "Badge",
    {
        badge_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        badge_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cover_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
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
        tableName: "badges",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

    }
);

export default Badge;