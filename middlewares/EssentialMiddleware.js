import cors from 'cors';
import morgan from 'morgan';
import User from '../models/users';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const essintialMiddlewares = (app, express) => {

    console.log('Essintial middlewares configured');

    app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    app.use(morgan('common'));
    //app.use(passport.initialize());
}



export default essintialMiddlewares;
