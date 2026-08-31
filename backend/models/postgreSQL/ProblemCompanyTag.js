import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const ProblemCompanyTag = sequelize.define(
    "ProblemCompanyTag",
    {
        problem_company_tag_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        problem_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "problems",
                key: "problem_id"
            }
        },
        company_tag: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: "problem_company_tags",
        timestamps: true,
    }
);

export default ProblemCompanyTag;