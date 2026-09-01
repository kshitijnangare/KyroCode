import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const ContestParticipant = sequelize.define(
    "ContestParticipant",
    {
        contest_participant_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        contest_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "contests",
                key: "contest_id"
            }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "user_id"
            }
        },
        achieved_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        penalty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        aggregate_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        rank: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        finishing_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        registered_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        is_rated: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "contest_participants",
        timestamps: true
    }
);

export default ContestParticipant;