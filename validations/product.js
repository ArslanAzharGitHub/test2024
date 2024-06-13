import Joi from 'joi';

const Product = Joi.object({
    body: Joi.object({
        productName: Joi
            .string()
            .required()
            .label('Product name'),
        size: Joi
            .string()
            .required()
            .label('Size'),
        color: Joi
            .string()
            .required()
            .label('Color'),
        price: Joi
            .string()
            .required()
            .label('Price'),
        quantity: Joi
            .number()
            .required()
            .label('Quantity'),
        image: Joi
            .string()
            .label('Image')
    })
        .required()

        .label('Body')
}).options({ allowUnknown: true });



/* product validation */

const ProductVariant = Joi.object({
    body: Joi.object({
        size: Joi.string().required().label('Size'),
        color: Joi.string().required().label('Color'),
        quantity: Joi.number().required().label('Quantity'),
        image: Joi.string().label('Images')
    }).required().label('Body')
}).options({ allowUnknown: true });

export {
    Product,
    ProductVariant
}