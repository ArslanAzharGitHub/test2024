import express from 'express';
const router = express.Router();

import { Login } from '../../controllers/User';
import response from '../../utility/response';
import User from '../../models/users';

import { Register as register, Login as login } from '../../validations/register';
import validation from '../../utility/validation';
import hashPass from '../../utility/hashPass';
import LoginStrategy from '../../middlewares/loginStrategy';
import createError from '../../utility/createError';

router.post('/', async (req, res) => {
    try {
        const result = await Login({ user: req.user });
        if (result) response(res, 201, result);

    } catch (error) {
        response(res, 409, {
            error: error.message
        });

    }
});


export default router;



