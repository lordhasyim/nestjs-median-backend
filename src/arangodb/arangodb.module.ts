import { Module } from '@nestjs/common';
import { Database } from 'arangojs';
import { env } from 'process';

@Module({
    providers: [
       {
        provide: 'ARANGODB',
        useFactory: async () => await new Database({
            url: process.env.ARANGO_URL,
            databaseName: process.env.ARANGO_DB,
            auth: {
                username: process.env.ARANGO_USER,
                password: process.env.ARANGO_PASSWORD
            }
        })
       }
    ]
})
export class ArangodbModule {}
