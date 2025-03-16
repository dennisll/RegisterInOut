import mongoose from 'mongoose'
import { DataBaseConnection, Options } from '..';


export class MongoDb implements DataBaseConnection{

    private optionsConneting: Options

    constructor(private readonly options: Options){
        this.optionsConneting = options
    }

    async connect(){ 

        const {url} = this.optionsConneting;

        try {

            await mongoose.connect(url!); 
            console.log('Mongo connected');
            
        } catch (error) {
            console.log('Mongo connection error');
            throw error
            
        }
    }
}