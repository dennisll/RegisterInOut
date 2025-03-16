import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import {envs} from './config/env'
import { MongoDb } from "./data";


(() => {
  main();
})();

async function main() {

  const mongoDb = new MongoDb({  
    url: envs.MONGO_URL
  });

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    databaseConnection: { mongoDb: mongoDb} 
  }).start();
}
