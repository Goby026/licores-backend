import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";

import * as cors from 'cors';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';

import routes from './routes';

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();
    // middlewares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(bodyParser.json());

    //routes
    app.use('/', routes);

    // start express server
    app.listen(PORT,() => {
        console.log(`Server corriendo en el puerto: ${ PORT }`)
    });

}).catch(error => console.log(error));
