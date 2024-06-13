import { Cart, Product, ProductVariant, Users } from '../../models';
import createError from "../../utility/createError";
import generateToken from "../../utility/tokenGenerator";

const Login = async ({ user }) => {
    const id = user.id;
    const email = user.email;
    const result = generateToken({ id, email });
    if (result) return {
        ...result
    }
};


const AddToCart = async ({ userId, productId, variantId, units }) => {
    const findCart = await Cart.findOne({
        where: { userId, productId, variantId }
    });
    if (findCart) throw createError('Cart already exist', 403);

    const addToCart = await Cart.create({ userId, productId, variantId, units });
    return {
        message: 'Cart added successfully',
        addToCart
    }
};

const MyCart = async ({ userId }) => {
    const findCart = await Cart.findAll({
        where: { userId },
        include: [
            { model: Product },
            { model: ProductVariant },
        ]
    });

    if (!findCart || findCart.length === 0) {
        throw createError('Cart not found or empty', 404);
    }

    let finalTotal = 0;
    const cart = findCart.map(item => {
        const product = item.Product;
        const productVariant = item.ProductVariant;
        const units = item.units;
        const price = product.price;
        const total = units * price;
        finalTotal += total;

        return {
            productId: product.id,
            productVariantId: productVariant.id,
            price,
            units,
            total
        };
    });

    process.env.cart = JSON.stringify(cart);
    process.env.cartTotal = finalTotal;
    return {
        message: 'My cart',
        result: { cart, total: finalTotal }
    };
};



export {
    Login,
    AddToCart,
    MyCart
}