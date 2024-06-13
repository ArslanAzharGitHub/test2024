import User from "../../models/users";
import createError from "../../utility/createError";
import hashPass from "../../utility/hashPass";
import sendEmail from "../../utility/sendEmail";
import generateToken from "../../utility/tokenGenerator";

/**
* @swagger
* /auth/signup:
*   post:
*     summary: Sign Up
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               fullName:
*                 type: string
*                 required: true
*                 description: First Name of User
*                 example: James
*               email:
*                 type: string
*                 required: true
*                 description: Email of User
*                 example: james.bond@gmail.com
*               password:
*                 type: string
*                 required: true
*                 description: Password of User
*                 example: Admin@123
*               mobile:
*                 type: string
*                 required: true
*                 description: Phone number of User
*                 example: 0909090990
*               roleId:
*                 type: string
*                 required: true
*                 description: Role of User
*                 example: 'Super Admin Staff'
*     tags:
*       - Auth
*     responses:
*       200:
*         description: Sign Up Successfully!
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   description: represent either sign up or not
*                   example: true
*                 message:
*                   type: string
*                   description: response message
*                   example: 'Signup Successfully!'
*       403:
*         description: Email already in use
*       500:
*         description: Some server error
*/





/***  Signup / Registration  **/
const Register = async ({
    fullName,
    email,
    password,
    mobile,
    roleId
}) => {
    const result = await User.create({
        fullName,
        email,
        password,
        mobile,
        roleId
    });
    if (!result) throw createError('Account registration error', 500);
    return {
        message: `Your email: ${email} is registered succeccfully`
    };
}


/***  Login  **/

const Login = async ({ user }) => {
    const id = user.id;
    const email = user.email;
    const result = generateToken({ id, email });
    if (result) return {
        ...result
    }
};



/***  Reset Password  **/

const ResetPassword = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw createError(`User not found`, 404);
    const newPassword = hashPass(password);
    const resetPassword = await User.update({ password: newPassword }, {
        where: {
            email: user.email
        }
    })
    return {
        message: `Password reset successfully`
    }
};













export {
    Login,
    Register,
    ResetPassword
}