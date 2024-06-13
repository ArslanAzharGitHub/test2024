import express from 'express';
const router = express.Router();
import response from '../../utility/response';

import tokenVerification from '../../utility/verifyToken';
import {
    OrdersList,
    mostSellerProduct,
    totalUnitsSold,
    overallSaleAmount
} from '../../controllers/orderDetails';
//import { totalUnitsSold, OverAllSaleAmount } from '../../controllers/orderDetails/orderInformation';
//import createError from '../../utility/createError';



/** Create Order **/
router.get('/', async (req, res) => {
    console.log('GetOrderDetails route');
    const { orderNumber } = req.body;
    try {
        const result = await OrdersList({
            orderNumber
        });
        response(res, 201, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});


/** Most Seller Product **/
router.get('/mostsellerproduct', async (req, res) => {
    console.log('mostsellerproduct route');

    try {
        const result = await mostSellerProduct();
        response(res, 201, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});


/** Total units sold **/
router.get('/total-units', async (req, res) => {
    console.log('total units route');

    try {
        const result = await totalUnitsSold();
        response(res, 200, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});

/** Total sale amount **/
router.get('/total-sale-amount', async (req, res) => {
    console.log('OverAllSaleAmount route');

    try {
        const result = await overallSaleAmount();
        response(res, 200, { ...result });
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});

export default router;



