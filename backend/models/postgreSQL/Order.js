import { sequelize } from "../../config/postgreSQL.js";
import { DataTypes } from "sequelize";

const Order = sequelize.define(
    "Order",
    {
        order_id: {
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
        }
        // rest of the table columns are yet to be decided.
    },
    {
        tableName: "orders",
        timestamps: true
    }
);

export default Order;