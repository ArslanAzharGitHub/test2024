import { sequelize, Sequelize } from '../config/database';

class Role extends Sequelize.Model {
  static associate() {
  }
}
Role.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: true
  },
  default: {
    type: Sequelize.STRING,
    allowNull: true
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'Role',
  tableName: 'roles'
}); 

export default Role;
