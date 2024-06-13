import { OrderDetail, Product, Order } from "../../models";
let totalUnits = 0;

const mostSellerProduct = async () => {
    const OrderDetails = await OrderDetail.findAll();
    let productIds = [];

    // Use reduce to flatten and extract productIds from the carts
    productIds = OrderDetails.reduce((acc, order) => {
        const cart = order.dataValues.cart;
        const ids = Object.keys(cart).map(key => cart[key].productId);
        return acc.concat(ids);
    }, []);

    // Use Map to count the frequency of each productId
    const frequencyCounter = new Map();
    productIds.forEach(productId => {
        frequencyCounter.set(productId, (frequencyCounter.get(productId) || 0) + 1);
    });

    // Find the productId with the highest frequency
    let maxFrequency = 0;
    let mostSoldProductId;
    frequencyCounter.forEach((frequency, productId) => {
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            mostSoldProductId = productId;
        }
    });

    // Retrieve the product with the most sold productId
    const mostSoldProduct = await Product.findOne({ where: { id: mostSoldProductId } });

    return {
        message: "Most Sold Product",
        MostSoldProduct: mostSoldProduct
    };
};


const totalUnitsSold = async () => {
    const OrderDetails = await OrderDetail.findAll();
    OrderDetails.forEach((cart) => {
        cart.dataValues.cart.forEach((item) => {
            totalUnits += item.units;
        });
    });
    return {
        message: 'Total units sold',
        totalUnits
    }

};

const overallSaleAmount = async () => {
    const totalSaleAmount = await Order.sum('cartAmount');
    return {
        message: 'Total Sale Amount',
        totalSaleAmount
    };
};

export {
    mostSellerProduct,
    totalUnitsSold,
    overallSaleAmount
};

