import express from 'express';
import router from '../routes';
import EssintialMiddlewares from '../middlewares/EssentialMiddleware';
import bodyParser from 'body-parser';


const app = express();

// Essential middleware
EssintialMiddlewares(app, express);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.use('/api/v1', router);

const StartServer = () => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server is connected to PORT: ${PORT}`);
    })
};

export default StartServer;