import { Op } from "sequelize";
import { Role } from "../../models";
import createError from "../../utility/createError";

const CreateRoles = async ({
    name
}) => {


    const roleFound = await Role.findOne({
        where: {
            name: { [Op.iLike]: `%${name}%` }
        }
    });

    if (roleFound) throw createError('Role already exist', 403);

    const roleCreated = await Role.create({
        name
    });

    if (!roleCreated) throw createError('Role Creation Error', 500);
    return {
        message: 'Role Created Successfully'
    }
}




/*****   delete Role   ******/
const DeleteRoles = async ({
    id
}) => {
    await Role.destroy({ where: { id } });
    return {
        message: 'Role Deleted Successfully'
    };
}


export {
    CreateRoles,
    DeleteRoles
}

