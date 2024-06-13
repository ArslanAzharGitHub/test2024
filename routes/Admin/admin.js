import express from 'express';
const router = express.Router();

import tokenVerification from '../../utility/verifyToken';

import { CreateProduct } from '../../controllers/Admin';
import response from '../../utility/response';
import { CreateRoles, DeleteRoles } from '../../controllers/Roles';
import Permit from '../../middlewares/permit';


router.post('/create-product', tokenVerification, async (req, res) => {
    const result = await CreateProduct()
    response(res, 200, {
        ...result
    })
});


/** Create Roles **/
router.post('/create-role', tokenVerification, Permit('Role'), async (req, res) => {
    try {
        const { name } = req.body;
        console.log('Role route');
        const result = await CreateRoles({
            name,
        })
        response(res, 200, { ...result })
    } catch (error) {
        error.code ? error.code : 500;
        response(res, error.code, { error: error.message })
    }
});


/** Delete - Roles **/
router.delete('/', async (req, res) => {
    try {
        const { name } = req.body;
        console.log('Role route');
        const result = await CreateRoles({
            name,
        })
        response(res, 200, { ...result })
    } catch (error) {
        error.code ? error.code : 500;
        response(res, error.code, { error: error.message })
    }
});

export default router;



