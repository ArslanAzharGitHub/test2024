import User from "../models/users"
import response from "../utility/response";
import bcrypt from 'bcrypt'

const LoginStrategy = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!user) response(res, 404, { message: 'User not found' });
    else {
        const isValid = bcrypt.compareSync(req.body.password, user.password);

        if (!isValid) response(res, 403, { message: 'Your Password is incorrect' });
        else {
            delete user?.dataValues?.password;
            req.user = user.dataValues;
            next();
        };
    }


}

export default LoginStrategy;