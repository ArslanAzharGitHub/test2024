import { OrderDetail } from "../../models";

import { Op } from "sequelize";

/** Get Orders Details **/
const OrdersList = async ({ orderNumber, userId, page = 0, pageSize = 10 }) => {
    try {
        const offset = page * pageSize;
        const limit = pageSize;

        // Build the where clause for the Product table
        const where = {};
        if (orderNumber) {
            where.orderNumber = { [Op.iRegexp]: orderNumber };
        }
        if (userId) {
            where.userId = userId
        }
        // Combine the filters into the main filter object
        const filter = {
            where: where,
            offset,
            limit
        };

        const { count, rows } = await OrderDetail.findAndCountAll(filter);

        return {
            message: 'List Retrieve Successfully',
            result: rows,
            count
        };
    } catch (error) {
        throw new Error(error.message); // Replace createError with a standard Error
    }
};


export default OrdersList;