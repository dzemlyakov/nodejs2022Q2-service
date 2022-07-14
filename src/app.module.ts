import { Module } from '@nestjs/common';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsModule } from './albums/albums.module';
import { AlbumsService } from './albums/albums.service';
import InMemoryDB from './DB/dataBase';

@Module({
  imports: [AlbumsModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB],
})
export class AppModule {}
