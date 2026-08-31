import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

const UserFollows = sequelize.define(
    "UserFollows",
    {
        user_follows_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        follower_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id"
            }
        },
        following_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id"
            }
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
        tableName: "user_follows",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default UserFollows;