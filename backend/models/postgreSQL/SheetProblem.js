import { sequelize } from "../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const SheetProblem = sequelize.define(
    "SheetProblem",
    {
        sheet_problem_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        problem_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "problems",
                key: 'problem_id'
            }
        },
        sheet_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "sheets",
                key: "sheet_id"
            }
        },
        // if needed in future add subheading title descriptions etc
    },
    {
        tableName: "",
        timestamps: true,
    }
);

export default SheetProblem;