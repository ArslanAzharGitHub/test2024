import { Order } from "../../models";

const UpdateOrder = async ({ orderNumber }) => {
    const updateOrder = await Order.update({
        action: true
    }, {
        where: {
            orderNumber
        }
    });

    return {
        message: `Order Number: ${orderNumber} is dipatched successfully`,
        updateOrder
    }
};

export default UpdateOrder;