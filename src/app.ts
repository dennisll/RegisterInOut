import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import {envs} from './config/env'
import { MongoDb } from "./data";


(() => {
  main();
})();

async function main() {

  const mongoDb = new MongoDb();

/*   await db.connect({
    dbName: envs.MONGO_DB_NAME,
    url: envs.MONGO_URL
  }) */

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
    databaseConnection: { mongoDb: mongoDb} //databaseConnection: [db]
  }).start();
}
