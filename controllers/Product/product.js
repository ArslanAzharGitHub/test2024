import { Op } from "sequelize";
import { Product, ProductVariant } from "../../models";
import createError from "../../utility/createError";


const AddProduct = async ({
    productName,
    size,
    color,
    price,
    quantity,
    image
}) => {
    try {

        const findProduct = await Product.findOne({
            where: {
                productName: { [Op.iLike]: `%${productName}%` }
            }
        });
        if (findProduct) throw createError('The product is already entered', 403);
        const addProduct = await Product.create({
            productName,
            price
        });
        if (addProduct) {
            const addVariant = await ProductVariant.create({
                productId: addProduct.id,
                size,
                color,
                quantity,
                image
            });
            return {
                message: `Product added successfully`,
                result: { ...addProduct, ...addVariant }
            }

        }


    } catch (error) {
        throw createError(error.message, 500);
    }
}


/** Add Product Variant **/
const AddProductVariant = async ({ id, size, color, image, quantity }) => {
    try {
        const findProduct = await Product.findOne({ where: { id } });
        if (!findProduct) throw createError('Product not found', 404);
        const findVariant = await ProductVariant.findOne({
            where: {
                productId: id,
                size,
                color
            }
        });
        if (findVariant) throw createError(`Varient already added`);
        const varientAdded = await ProductVariant.create({
            productId: id,
            size,
            color, image, quantity
        });
        return {
            message: `Variant Added`,
            varientAdded: varientAdded?.dataValues || {}
        }
    } catch (error) {
        throw createError(error.message, 500);
    }
};

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Endpoint summary
 *     description: Description of the endpoint
 *     responses:
 *       200:
 *         description: Successful response
 */

/** Get Products  **/
const SearchProducts = async ({ productName, size, price, color, page = 0, pageSize = 10 }) => {
    try {
        const offset = page * pageSize;
        const limit = pageSize;

        // Build the where clause for the Product table
        const productWhere = {};
        if (productName) {
            productWhere.name = { [Op.iRegexp]: productName };
        }
        if (price) {
            productWhere.price = { [Op.lte]: price }; // Adjust the price condition as needed
        }

        // Build the where clause for the ProductVariant table
        const variantWhere = {};
        if (size) {
            variantWhere.size = { [Op.iRegexp]: size };
        }
        if (color) {
            variantWhere.color = { [Op.iRegexp]: color };
        }

        // Combine the filters into the main filter object
        const filter = {
            where: productWhere,
            include: [{
                model: ProductVariant,
                where: variantWhere,
                required: true // Ensure that only products with matching variants are returned
            }],
            offset,
            limit
        };

        const { count, rows } = await Product.findAndCountAll(filter);

        return {
            message: 'List Retrieve Successfully',
            result: rows,
            count
        };
    } catch (error) {
        throw new Error(error.message); // Replace createError with a standard Error
    }
};


/** Delete Product **/
const DeleteProduct = async ({ id }) => {
    try {
        await Product.destroy({ where: { id } });
    } catch (error) {
        throw createError(error.message, 500);
    }
};


/** Update Product **/
const UpdateProduct = async ({ id, productName, price }) => {
    try {
        console.log('update Product controller');
        const fields = {};
        if (productName || price) {
            if (productName) {
                const productNameFound = await Product.findOne({
                    where: {
                        productName
                    }
                });
                if (productNameFound) throw createError('Product already exist', 403);
            }
            if (productName) fields.productName = productName;
            if (price) fields.price = price;
            console.log(fields);
            const updatedProduct = await Product.update({ ...fields }, { where: { id } });
            return {
                message: `Product Updated`,
                updatedProduct
            }
        };


    } catch (error) {
        throw new Error(error.message); // Replace createError with a standard Error
    }
};






export {
    AddProduct,
    DeleteProduct,
    AddProductVariant,
    SearchProducts,
    UpdateProduct
};