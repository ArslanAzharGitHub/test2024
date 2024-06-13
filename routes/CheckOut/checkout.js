import express from 'express';
import response from '../../utility/response';
import { CheckOut, OrdersList, UpdateOrder } from '../../controllers/Check-Out'
import createError from '../../utility/createError';

const router = express.Router();


/** Create Order **/
router.post('/', async (req, res) => {
    console.log('Checkout route');


    // Order number generation
    function generateOrderNumber() {
        // Generate a random number between 1000000 and 9999999
        const orderNumber = Math.floor(1000000 + Math.random() * 9000000);
        return orderNumber;
    }
    const newOrderNumber = generateOrderNumber();

    try {
        const {
            name,
            mobile,
            country,
            province,
            city,
            address
        } = req.body;
        const array = [name, mobile, country, province, city, address];
        array.forEach((item, index) => {
            const obj = {
                0: 'name',
                1: 'mobile',
                2: 'country',
                3: 'province',
                4: 'city',
                5: 'address',
            }
            let field = obj[index];
            if (!item) throw createError(`${field} cannot be null or empty`, 403);
        });
        const result = await CheckOut({
            userId: req.user.id,
            orderNumber: newOrderNumber,
            name,
            mobile,
            country,
            province,
            city,
            address
        })
        response(res, 201, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});






/** Order List **/
router.get('/', async (req, res) => {
    console.log('Order list route');

    try {
        const {
            orderNumber,
            userId
        } = req.query;
        const result = await OrdersList({
            orderNumber,
            userId
        });
        response(res, 200, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});






/** Update Order  **/

router.put('/', async (req, res) => {
    console.log('Order Update route');

    try {
        const {
            orderNumber,
        } = req.query;
        const result = await UpdateOrder({
            orderNumber
        });
        response(res, 200, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});

export default router;



