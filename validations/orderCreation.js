import Joi from 'joi';

const OrderCreation = Joi.object({
    body: Joi.object({
        name: Joi
            .string()
            .required()
            .label('Name'),
        mobile: Joi
            .string()
            .required()
            .label('Mobile'),
        country: Joi
            .string()
            .required()
            .label('Country'),
        province: Joi
            .string()
            .required()
            .label('Province'),
        city: Joi
            .string()
            .required()
            .label('City'),
        address: Joi
            .string()
            .required()
            .label('Address')
    })
        .required()
        .label('Body')
}).options({ allowUnknown: true });

export {
    OrderCreation
}