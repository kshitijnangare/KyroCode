import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const DailyProblem = sequelize.define(
    "DailyProblem",
    {
        daily_problem_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        problem_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "problems",
                key: "problem_id"
            }
        }
    },
    {
        tableName: "daily_problems",
        timestamps: true,
    }
);

export default DailyProblem;