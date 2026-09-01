import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const ContestProblem = sequelize.define(
    "ContestProblem",
    {
        contest_problem_id: {
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
        problem_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "problems",
                key: "problem_id"
            }
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 100
        },
        order_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    },
    {
        tableName: "contest_problems",
        timestamps: true
    }
);

export default ContestProblem;