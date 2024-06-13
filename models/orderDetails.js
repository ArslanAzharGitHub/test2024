import { DataTypes, INTEGER } from 'sequelize';
import { sequelize, Sequelize } from '../config/database';
DataTypes
class OrderDetail extends Sequelize.Model {
    static associate() {
    }
}
OrderDetail.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    orderNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cart: {
        type: DataTypes.ARRAY(DataTypes.JSON), // Define as array of JSON objects
        allowNull: false
    },
    cartTotal: {
        type: INTEGER,
        allowNull: false
    }

}, {
    sequelize,
    timestamps: true,
    modelName: 'OrderDetail',
    tableName: 'orderDetails'
});

export default OrderDetail;
