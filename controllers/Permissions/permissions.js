import Permission from "../../models/permissions";
import createError from "../../utility/createError";

const CreatePermissions = async ({
    pageName,
    permissions,
    roleId
}) => {
    console.log('Permission Controller');
    const permissionFound = await Permission.findOne({
        where: {
            pageName,
            roleId
        }
    });
    if (permissionFound) {
        const result = await Permission.update({
            permissions
        }, {
            where: {
                pageName,
                roleId
            }
        });
        return {
            message: `Updated Successfully`,
            result
        }
    }
    else {
        const permissionCreate = await Permission.create({
            pageName,
            permissions,
            roleId
        });
        return {
            message: `Permission created Successfully`,
            permissionCreate
        }
    }

};

const PermissionDelete = async ({ id }) => {
    const permissionDeleted = await Permission.destroy({
        where: {
            id
        }
    });

    return {
        message: `Permission Deleted`,
        permissionDeleted
    }
}


export {
    CreatePermissions,
    PermissionDelete
}