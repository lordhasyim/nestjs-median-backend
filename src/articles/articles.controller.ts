import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    // return this.articlesService.create(createArticleDto);
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto);
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    // return this.articlesService.findAll();
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts() {
    // return this.articlesService.findDrafts();
    const drafts = await this.articlesService.findDrafts();
    return drafts.map((draft) => new ArticleEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // const article = new ArticleEntity(
    //   await this.articlesService.findOne(id)
    // );
    // // console.log( JSON.stringify(article) ); 
    // if (!article) {
    //   throw new NotFoundException('Article with ${id} does not exist');
    // }

    // return article;
    return new ArticleEntity(
      await this.articlesService.findOne(id)
    );
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    // return this.articlesService.update(id, updateArticleDto);
    return new ArticleEntity(
      await this.articlesService.update(id, updateArticleDto)
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    // return this.articlesService.remove(id);
    return new ArticleEntity(
      await this.articlesService.remove(id)
    );
  }
}
