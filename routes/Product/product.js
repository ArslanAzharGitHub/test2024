import express from 'express';
const router = express.Router();
import response from '../../utility/response';

import {
    AddProduct,
    DeleteProduct,
    AddProductVariant,
    SearchProducts,
    UpdateProduct
} from '../../controllers/Product';
import uploadFile from '../../config/upload';
import { Product, ProductVariant } from '../../validations/product';
import validation from '../../utility/validation';


/** Add Product Route **/

router.post('/', uploadFile.single('image'), validation(Product), async (req, res) => {
    console.log('Product route');
    if (req.file) {
        req.body.image = req.file.filename
    };
    const {
        productName,
        size,
        color,
        price,
        quantity,
        image
    } = req.body;

    try {
        const result = await AddProduct({
            productName,
            size,
            color,
            price,
            quantity,
            image
        });
        response(res, 201, result);
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});






/** Add Product Variant Route **/

router.post('/addproductvariant', uploadFile.single('image'), validation(ProductVariant), async (req, res) => {
    if (req.file) {
        req.body.image = req.file.filename
    };
    console.log('Add Product Variant route');
    const {
        id
    } = req.query;

    const {
        size, color, image, quantity
    } = req.body;


    try {
        const result = await AddProductVariant({
            id, size, color, image, quantity
        });
        response(res, 201, result);
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});



/** Delete Product Route **/

router.delete('/', async (req, res) => {
    console.log('Delete Product route');
    const {
        id
    } = req.query;

    try {
        const result = await DeleteProduct({
            id
        });
        response(res, 201, result);
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});



/** Search Product Route **/

router.get('/', async (req, res) => {
    console.log('Search Product route');
    const {
        productName, size, price, color
    } = req.query;

    try {
        const result = await SearchProducts({
            productName, size, price, color
        });
        response(res, 200, result);
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});


/** Update Product Route **/

router.put('/', async (req, res) => {
    console.log('update Product route');
    const {
        id
    } = req.query;
    const {
        productName, price
    } = req.body;

    try {
        const result = await UpdateProduct({
            id, productName, price
        });
        response(res, 200, result);
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});

export default router;