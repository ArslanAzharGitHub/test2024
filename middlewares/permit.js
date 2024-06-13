
import { Role, Permissions } from '../models'
const Permit = (permission) => {
    return async (req, res, next) => {
        const role = await Role.findOne({ where: { id: req.user.roleId } });
        const rolePermissions = await Permissions.findOne({ where: { roleId: req.user.roleId, pageName: permission } });

        const permissionsMethods = {
            'POST': 'Create',
            'GET': 'Read',
            'DELETE': 'Delete',
            'PUT': 'Update'
        };

        const { permissions } = rolePermissions?.dataValues;
        const isPermitted = permissions?.includes(permissionsMethods[req.method]);
        if (isPermitted || role?.dataValues?.name === 'Super Admin') {
            console.log('Permit: ', isPermitted);
            next(); // User has permission, proceed to the next middleware or route handler
        } else {
            res.status(403).json({ message: 'Permission denied' }); // User does not have permission
        }
    }

}

export default Permit;