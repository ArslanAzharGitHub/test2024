import response from "./response";
import Joi from 'joi';

const validation = (Schema) => async (req, res, next) => {
    const { error } = Joi.compile(Schema).validate(req, { errors: { label: 'key', wrap: { label: false } } });
    if (error) {
        const err = { statusCode: error.statusCode || 400, message: error.message };
        return response(res, err.statusCode, err.message);
    }
    return next();
};

export default validation;