import { sequelize } from "../../config/database";
import { DataTypes } from "sequelize";

const ProblemTopicTag = sequelize.define(
    "ProblemTopicTag",
    {
        problem_topic_tag_id: {
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
        topic_tag: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: "problem_topic_tags",
        timestamps: true,
    }
);

export default ProblemTopicTag;