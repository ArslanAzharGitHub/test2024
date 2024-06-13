import { sequelize, Sequelize } from '../config/database';

class Cart extends Sequelize.Model {
    static associate() {
    }
}
Cart.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    productId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    variantId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    units: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Cart',
    tableName: 'carts'
});

export default Cart;
