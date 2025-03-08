import mongoose from 'mongoose'
import { DataBaseConnection, Options } from '..';


export class MongoDb implements DataBaseConnection{

    async connect(options: Options){

        const {url, dbName} = options;

        try {

            await mongoose.connect(url!); 
            console.log('Mongo connected');
            
        } catch (error) {
            console.log('Mongo connection error');
            throw error
            
        }
    }
}