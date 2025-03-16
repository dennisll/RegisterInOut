import express, { Router } from 'express';
import { DataBaseConnection } from '../data';

interface Options{
    port?: number;
    routes: Router;
    databaseConnection: {[ key: string]: DataBaseConnection}   
}

export class Server{

    public readonly app = express();

    private readonly port: number;
    private readonly routes: Router;
    private readonly databaseConnection: {[ key: string]: DataBaseConnection} 

    constructor( options: Options) {

        const { port = 3000, routes, databaseConnection} = options;
        this.port = port;
        this.routes = routes;
        this.databaseConnection = databaseConnection;
    }

    async start(){

        //Middlewares
        this.app.use(express.json());  // serializa la data application/json de la req en un json
        this.app.use(express.urlencoded({extended:true})); //serializa la data application/x-www-form-urlencoded de la req en un json

        //conectar a la base de datos
        const mongoDb = this.databaseConnection.mongoDb;

        await mongoDb.connect()

        //usar las rutas definidas
        this.app.use(this.routes);

        this.app.listen(this.port, () =>{
            console.log(`server running on port ${this.port}`);
        })

    }
}