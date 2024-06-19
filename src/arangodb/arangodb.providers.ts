import { Provider } from "@nestjs/common";
import { Database } from "arangojs";


export const arangoDbProvider: Provider = {
    provide: 'ARANGODB',
    useFactory: async () => await  new Database({
      url: process.env.ARANGO_URL,
          databaseName: process.env.ARANGO_DB,
          auth: { username: process.env.ARANGO_USER
          , password: process.env.ARANGO_PASSWORD
       },
    }),
  };