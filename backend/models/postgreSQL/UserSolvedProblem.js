import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const UserSolvedProblem = sequelize.define(
    "UserSolvedProblem",
    {
        user_solved_problem_id: {
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
        problem_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "problems",
                key: "problem_id"
            }
        },
        solved_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    },
    {
        tableName: "user_solved_problems",
        timestamps: true
    }
);

export default UserSolvedProblem;