import { sequelize } from "../../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    "User",
    {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        phone_number: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        display_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        avatar_url: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: "https://via.placeholder.com/150"
        },
        gender: {
            type: DataTypes.ENUM("male", "female", "other"),
            allowNull: true,
            defaultValue: "other"
        },
        location: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        password_hash: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("admin", "user"),
            allowNull: false,
            defaultValue: "user"
        },
        linkedin_url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        portfolio_url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        github_url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        codolio_url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        twitter_url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },
        other_website_urls: {
            type: DataTypes.ARRAY(DataTypes.STRING(2048)),
            defaultValue: [],
            allowNull: true
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        // --------------------------------------------------------------------------
        // NOTE: Foreign key arrays (workex_ids, followers, solved_problem_ids, etc.) 
        // will store raw UUIDs without database enforcement. 
        // Use Sequelize Associations (hasMany / belongsToMany) in production.
        // --------------------------------------------------------------------------
        // workex_ids: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // education_ids: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // submissions: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // solved_problem_ids: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // attempted_contest_ids: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // my_sheets: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // badges: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     allowNull: true,
        //     defaultValue: []
        // },
        // followers: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     defaultValue: []
        // },
        // following: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     defaultValue: []
        // },
        // orders: {
        //     type: DataTypes.ARRAY(DataTypes.UUID),
        //     defaultValue: []
        // },
        institute_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "institutes",
                key: "institute_id"
            }
        },
        skills: {
            type: DataTypes.ARRAY(DataTypes.STRING(255)),
            allowNull: true,
            defaultValue: []
        },
        recent_submissions_toggle: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        submissions_heatmap_toggle: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 1500,
            allowNull: true,
        },
        max_rating: {
            type: DataTypes.INTEGER,
            defaultValue: 1500,
            allowNull: true,
        },
        rank: {
            type: DataTypes.INTEGER,
            defaultValue: 5000000,
            allowNull: true
        },
        total_active_days: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        total_coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        current_streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        max_streak: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_premium_user: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
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
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default User;