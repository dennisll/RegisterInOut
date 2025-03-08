import jwt from 'jsonwebtoken'
import { envs } from './env';


export class JwtAdapter{

    static generateToken
    (payload: Object, duration: string = ' 2h'):
     Promise<string | null>{
       return new Promise((resolve)=>{
         jwt.sign( payload, envs.JWT_SECRET, (err, token)=>{

            if(err) return resolve(null);
            return resolve(token!)
         })
       })
    }
}