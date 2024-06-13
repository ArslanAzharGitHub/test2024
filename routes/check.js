import express from 'express';
import response from '../utility/response';
import Stripe from 'stripe';

const router = express.Router();


// Endpoint to create a payment intent
router.post('/', async (req, res) => { response(res, 200, 'Check is working') }
);

export default router;
