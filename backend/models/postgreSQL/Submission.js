import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const Submission = sequelize.define(
    "Submission",
    {
        submission_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        // submission_number: {},
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
        contest_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "contests",
                key: "contest_id"
            }
        },
        language: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "Java"
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('Queued', 'Running', 'Accepted', 'Wrong Answer',
                'Time Limit Exceeded', 'Memory Limit Exceeded',
                'Runtime Error', 'Compilation Error'),
                // you can coonsider codeforeces verdicts in future
            allowNull: false,
            defaultValue: "Queued"
        },
        time_ms: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        memory_mb: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        test_cases_passed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        error_output: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        error_message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        submitted_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }
);

export default Submission;