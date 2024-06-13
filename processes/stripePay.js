import Stripe from 'stripe';
import createError from "../utility/createError";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;




const stripePay = async ({ amount }) => {

    try {
        // Initialize Stripe with your secret key
        const stripe = Stripe(`${STRIPE_SECRET}`);
        if (!STRIPE_SECRET) throw createError('Srtipe Secret not found', 404);


        const currency = process.env.CURRENCY || 'USD';
        if (!amount || !currency) {
            throw createError('Amount or currency cannot be null or empty', 403);
        }
        const customer = await stripe.customers.create();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency,
            customer: customer.id,
            payment_method_types: ['card']
        });


        const paymentIntent2 = await stripe.paymentIntents.confirm(paymentIntent.id, {
            payment_method: 'pm_card_visa',
        });
        console.log('Stripe Payed Successfuly');
        return {
            customer: customer.id,
            clientSecret: paymentIntent.client_secret,
            paymentIntent2
        }


    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw createError(`Error: ${error.message}`, 403);
    }
}

export default stripePay; 