import express from 'express';
const router = express.Router();

import Permit from '../middlewares/permit';

import auth from './Authentication/authentication'
import admin from './Admin/admin';
import user from './User/users';
import role from './Roles/role';
import permission from './Permissions/permissions';
import product from './Product/product';
import cart from './Cart/cart';
import tokenVerification from '../utility/verifyToken';
import CheckOut from './CheckOut/checkout';

import OrderDetails from './OrderDetails/orderDetails';

import check from './check';
import swagger from './swagger';



router.use('/swagger', swagger);
router.use('/auth', auth);
router.use('/admin', admin);
router.use('/user', user);
router.use('/role', role, Permit('Role'));
router.use('/permission', permission);
router.use('/product', product);

router.use('/cart', tokenVerification, cart);

router.use('/checkout', tokenVerification, CheckOut);

router.use('/orderdetails', tokenVerification, OrderDetails);


/**       Check   **/
router.use('/check', check);








export default router;