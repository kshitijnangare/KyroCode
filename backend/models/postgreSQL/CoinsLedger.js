import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const CoinsLedger = sequelize.define(
    "CoinsLedger",
    {
        coins_ledger_id: {
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
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        reason: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        reference_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "submissions",
                key: "submission_id"
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
        tableName: "coins_ledgers",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default CoinsLedger;