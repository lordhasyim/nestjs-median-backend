import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { arangoDbProvider } from 'src/arangodb/arangodb.providers';
import { ArangodbModule } from 'src/arangodb/arangodb.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, arangoDbProvider],
  imports: [PrismaModule, ArangodbModule],
})
export class ArticlesModule {}
