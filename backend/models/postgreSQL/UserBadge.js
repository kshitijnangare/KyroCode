import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const UserBadge = sequelize.define(
    "UserBadge",
    {
        user_badge_id: {
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
        badge_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "badges",
                key: "badge_id"
            }
        },
        earned_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: "user_badges",
        timestamps: true
    }
);

export default UserBadge;