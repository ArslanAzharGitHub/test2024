import { sequelize, Sequelize } from '../config/database';

class ProductVariant extends Sequelize.Model {
    static associate() {
    }
}
ProductVariant.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    productId: {
        type: Sequelize.UUID,
        allowNull: false
    },
    size: {
        type: Sequelize.STRING,
        allowNull: false
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'ProductVariant',
    tableName: 'productVariants'
});

export default ProductVariant;
