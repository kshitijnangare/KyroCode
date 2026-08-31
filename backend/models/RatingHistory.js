import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

const RatingHistory = sequelize.define(
    "RatingHistory",
    {
        rating_history_id: {
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
        contest_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "contests",
                key: "contest_id"
            }
        },
        old_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        new_rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        rank: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        recorded_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
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
        tableName: "rating_history",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default RatingHistory;