
import { Order, OrderDetail, Cart } from "../../models";

import stripePay from "../../processes/stripePay";
import createError from '../../utility/createError';


const CheckOut = async ({
    userId,
    orderNumber,
    name,
    mobile,
    country,
    province,
    city,
    address
}) => {

    if (!process.env.cart && !process.env.cartTotal) {
        throw createError('Please visit you cart first', 403);
    }
    const jobs = [];
    const cart = JSON.parse(process.env.cart);
    const cartTotal = process.env.cartTotal;




    /*******    Creating Order *******/

    const orderPlace = await Order.create({
        userId,
        orderNumber,
        cartAmount: cartTotal,
        name,
        mobile,
        country,
        province,
        city,
        address,
        status: true
    });
    if (!orderPlace) throw createError('Order creation error', 500);



    /*******    Creating Order Details *******/

    const orderDetails = await OrderDetail.create({
        userId,
        orderNumber,
        cart,
        cartTotal
    });
    if (!orderDetails) throw createError('Order Details error', 500);





    /******* Stripe Pay *******/

    const payment_Created = await stripePay({ amount: cartTotal });


    /*******  Deleting User Cart *******/

    const detetingCart = await Cart.destroy({ where: { userId } });


    /******* Pushing jobs into promis *******/

    jobs.push(orderPlace);
    jobs.push(orderDetails);
    jobs.push(payment_Created);
    jobs.push(detetingCart);

    await Promise.all(jobs);





    return {
        message: 'Order created successfully',
        result: orderPlace
    }
};

export default CheckOut;