import express from 'express';
const router = express.Router();

import { AddToCart, MyCart } from '../../controllers/User';
import response from '../../utility/response';


import { Register as register, Login as login } from '../../validations/register';
import validation from '../../utility/validation';
import hashPass from '../../utility/hashPass';
import LoginStrategy from '../../middlewares/loginStrategy';
import createError from '../../utility/createError';

router.post('/', async (req, res) => {
    try {
        const { productId, variantId, units } = req.body;
        const result = await AddToCart({ userId: req.user.id, productId, variantId, units });
        if (result) response(res, 201, result);

    } catch (error) {
        response(res, error.code, {
            error: error.message
        });

    }
});

router.get('/', async (req, res) => {
    try {
        const result = await MyCart({ userId: req.user.id });
        if (result) response(res, 201, result);
    } catch (error) {
        response(res, error.code, { error: error.message });
    }
});


export default router;



