import User from "../models/users";
import response from "./response";
import jwt from 'jsonwebtoken'

const tokenVerification = async (req, res, next) => {

    let barrerToken = req.headers["authorization"];
    let token = barrerToken && barrerToken.split(" ")[1];

    if (!token) response(res, 403, { message: 'Unauthorized' })
    else {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        try {
            if (email) {
                const user = await User.findOne({ where: { email } });
                delete user?.dataValues.password;
                req.user = user.dataValues;
                next();
            }
        } catch (error) {
            console.log(error);
            response(res, 404, { error })
        }
    }
}

export default tokenVerification;