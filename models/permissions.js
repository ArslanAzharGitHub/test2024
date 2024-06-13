import { sequelize, Sequelize } from '../config/database';

class Permission extends Sequelize.Model {
    static associate() {
    }
}
Permission.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    pageName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    permissions: {
        type:Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    },
    roleId: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Permission',
    tableName: 'permission'
});

export default Permission;
