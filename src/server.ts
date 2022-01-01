import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import PostsRoutes from './routes/PostsRoutes';


class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    async config() {
        const URI = 'mongodb://localhost/API-REST';
        mongoose.connect(URI, function(error) {
            // if error is truthy, the initial connection failes
            console.log(error);
        })
        //settings
        this.app.set('port', process.env.PORT || 3001);
        //Midlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    routes() {
        this.app.use(indexRoutes);
        this.app.use('/api/posts', PostsRoutes);

    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port 3001", this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();