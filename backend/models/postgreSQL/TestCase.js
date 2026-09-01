import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const TestCase = sequelize.define(
    "TestCase",
    {
        test_case_id: {
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
        input: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expected_output: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        is_public: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        order_index: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1
        }
    }
);

export default TestCase;