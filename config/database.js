import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    dialectOptions: {
        connectTimeout: 50000
    },
    pool: {
        max: 150,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: true
    },
    logging: false
});

const db = {};
const ConnectDB = async () => {
    if (db.isConnected) {
        console.log('Using existing connection.');
    }
    console.log('Creating new connection');
    await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    db.isConnected = true;
    console.log(`New connection created, db:${db ? db.isConnected: 'no'}`);
};

export { sequelize, Sequelize };
export default ConnectDB;