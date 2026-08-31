import { memo } from "react";
import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

const Problem = sequelize.define(
    "Problem",
    {
        problem_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        problem_number: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            defaultValue: sequelize.literal(
                "CONCAT('KCP-', nextval('problem_serial_seq'))",
            ),
        },
        problem_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        problem_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        difficulty: {
            type: DataTypes.ENUM('Easy','Medium','Hard'),
            defaultValue: "easy",
            allowNull: false
        },
        total_submissions: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        total_accepted: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        time_limit_ms: {
            type: DataTypes.INTEGER,
            defaultValue: 2000,
            allowNull: false
        },
        memory_limit_mb: {
            type: DataTypes.INTEGER,
            defaultValue: 256,
            allowNull: false
        },
        // company_tags: {
        //     type: DataTypes.ARRAY(DataTypes.STRING(255)),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // topic_tags: {
        //     type: DataTypes.ARRAY(DataTypes.STRING(255)),
        //     allowNull: true,
        //     defaultValue: []
        // },
        hints: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: true,
            defaultValue: []
        },
        similar_problem_ids: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: true,
            defaultValue: []
        },
        discussions: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: true,
            defaultValue: []
        },
        solutions: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            allowNull: true,
            defaultValue: []
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
        tableName: "problems",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);