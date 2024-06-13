import Users from './users'
import Role from './roles'
import Permissions from './permissions'
import Product from './product'
import ProductVariant from './productVariant'

import Cart from './carts'
import Order from './orders'
import OrderDetail from './orderDetails'





Users.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasOne(Users, { foreignKey: 'roleId' });
Permissions.hasMany(Role, { foreignKey: 'roleId' });

Product.hasMany(ProductVariant, { foreignKey: 'productId' });

Cart.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsTo(ProductVariant, { foreignKey: 'variantId' });

Order.belongsTo(Users, { foreignKey: 'userId' });
//Order.belongsTo(OrderDetail, { foreignKey: 'orderNumber', targetKey: 'orderNumber' });


export {
    Users,
    Role,
    Permissions,
    Product,
    ProductVariant,
    Cart,
    Order,
    OrderDetail
}