import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const Contest = sequelize.define(
    "Contest",
    {
        contest_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        contest_number: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            defaultValue: sequelize.literal(
                "CONCAT('KCC-', nextval('contest_serial_seq'))",
            ),
        },
        contest_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        total_score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 400
        },
        total_registrations:{
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        contest_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.ENUM("upcoming", "live", "ended"),
            allowNull: false,
            defaultValue: "upcoming"
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
        tableName: "contests",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Contest;