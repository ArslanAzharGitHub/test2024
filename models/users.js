import { sequelize, Sequelize } from '../config/database';

class User extends Sequelize.Model {
  static associate() {
  }
}
User.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true
  },
  roleId: {
    type: Sequelize.UUID,
    allowNull: false,
  }
}, {
  sequelize,
  timestamps: true,
  modelName: 'User',
  tableName: 'users'
});

export default User;
