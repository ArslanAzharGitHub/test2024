import express from 'express';
const router = express.Router();

import tokenVerification from '../../utility/verifyToken';

import response from '../../utility/response';
import { CreateRoles, DeleteRoles } from '../../controllers/Roles';



/** Create Roles **/
router.post('/', tokenVerification, async (req, res) => {
    try {
        const { name } = req.body;
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
        const { id } = req.query;
        const result = await DeleteRoles({
            id,
        })
        response(res, 200, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }

});

export default router;



