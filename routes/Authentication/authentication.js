import express from 'express';
const router = express.Router();

import { Login, Register, ResetPassword } from '../../controllers/Authentication';
import response from '../../utility/response';
import User from '../../models/users';

import { Register as register, Login as login } from '../../validations/register';
import validation from '../../utility/validation';
import hashPass from '../../utility/hashPass';
import LoginStrategy from '../../middlewares/loginStrategy';
import createError from '../../utility/createError';
import sendEmail from '../../utility/sendEmail';

router.post('/login', validation(login), LoginStrategy, async (req, res) => {
    try {
        const result = await Login({ user: req.user });
        if (result) response(res, 201, result);

    } catch (error) {
        response(res, 409, {
            error: error.message
        });

    }
});



router.post('/signup', validation(register), async (req, res) => {

    const {
        fullName,
        email,
        password,
        mobile,
        roleId
    } = req.body;

    try {

        const userFound = await User.findOne({
            where: {
                email
            }
        });
        if (userFound) throw createError('The email is already been used', 403)
        const result = await Register({
            fullName,
            email,
            password: hashPass(password),
            mobile,
            roleId
        });

        if (result) response(res, 201, result);

    } catch (error) {

        response(res, 500, {
            error: error.message
        });


    }
});


router.post('/forget-password', async (req, res) => {
    try {
        const {
            email
        } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) throw createError('User not found', 404);
        const emailSent = await sendEmail(res, { id: user.id, email: user.email });
        process.env.userEmail = email;
        response(res, 200, emailSent);

    } catch (error) {
        response(res, 409, {
            error
        });

    }
});


router.get('/reset-password', async (req, res) => {
    try {

        const { password } = req.body;
        const email = process.env.userEmail
        const result = await ResetPassword({ email, password });
        response(res, 201, result);
    } catch (error) {
        response(res, 409, {
            error: error.message
        });
    }
});

export default router;



