import Joi from 'joi';
const PASSWORD_PATTERN = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z0-9\\S]{8,}$';
const PASSWORD_PATTERN_ERROR = {
    'string.pattern.base':
        'Password must be at least 8 characters and contain at least 1 lowercase, 1 uppercase, 1 number and 1 special character.'
};


const Register = Joi.object({
    body: Joi.object({
        fullName: Joi
            .string()
            .required()
            .label('Name'),
        email: Joi
            .string()
            .required()
            .email()
            .label('Email'),
        password: Joi
            .string()
            .required()
            .pattern(new RegExp(PASSWORD_PATTERN))
            .messages({
                ...PASSWORD_PATTERN_ERROR
            })
            .label('Password'),
        mobile: Joi
            .string()
            .required()
            .label('Mobile')
    })
        .required()

        .label('Body')
}).options({ allowUnknown: true });

const Login = Joi.object({
    body: Joi.object({
        email: Joi
            .string()
            .required()
            .email()
            .label('Email'),
        password: Joi
            .string()
            .required()
            .label('Password'),
    })
        .required()

        .label('Body')
}).options({ allowUnknown: true });



export {
    Register,
    Login
}