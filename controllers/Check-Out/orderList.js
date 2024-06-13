import { Order, Users, OrderDetail } from "../../models";

/** Get Orders  **/
const OrdersList = async ({ orderNumber, userId, page = 0, pageSize = 10 }) => {
    try {
        const offset = page * pageSize;
        const limit = pageSize;

        // Build the where clause for the Product table
        const where = {};
        if (orderNumber) {
            where.orderNumber = orderNumber;
        }
        if (userId) {
            where.userId = userId
        }
        // Combine the filters into the main filter object
        const filter = {
            where: where,
            include: [{ model: Users }],
            offset,
            limit
        };
        const { count, rows } = await Order.findAndCountAll(filter);
        rows.forEach((order, index) => { delete rows[index].dataValues?.User.dataValues.password; /*Delete password from the Object*/ });
        return {
            message: 'List Retrieve Successfully',
            result: rows,
            count
        };
    } catch (error) {
        throw createError(error, 500); // Replace createError with a standard Error
    }
};


export default OrdersList;