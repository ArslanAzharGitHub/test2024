import express from 'express';
const router = express.Router();
import response from '../../utility/response';

import tokenVerification from '../../utility/verifyToken';
import { CreatePermissions, PermissionDelete } from '../../controllers/Permissions';


/** Create Permission **/
router.post('/create-permission', async (req, res) => {
    console.log('Permission route');

    try {
        const {
            pageName,
            permissions,
            roleId
        } = req.body;
        const result = await CreatePermissions({
            pageName,
            permissions,
            roleId
        })
        response(res, 200, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});


/** Delete - Permission **/

router.delete('/', async (req, res) => {
    try {
        const { id } = req.query;
        console.log('Permission route');
        const result = await PermissionDelete({
            id
        })
        response(res, 200, { ...result })
    } catch (error) {
        const statusCode = error.code || 500;
        response(res, statusCode, { error: error.message });
    }
});

export default router;



