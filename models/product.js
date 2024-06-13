import { sequelize, Sequelize } from '../config/database';

class Product extends Sequelize.Model {
    static associate() {
    }
}
Product.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Product',
    tableName: 'products'
});

export default Product;
