import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes, UUID } from "sequelize";

const ContestContributor = sequelize.define(
    "ContestContributor",
    {
        contest_contributor_id: {
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
        }
    },
    {
        tableName: "contest_contributors",
        timestamps: true
    }
);

export default ContestContributor;