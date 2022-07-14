import { Module } from '@nestjs/common';
import { AlbumsController } from './albums/albums.controller';
import { AlbumsModule } from './albums/albums.module';
import { AlbumsService } from './albums/albums.service';
import { TracksModule } from './tracks/tracks.module';
import InMemoryDB from './DB/dataBase';
import { TracksService } from './tracks/tracks.service';

@Module({
  imports: [AlbumsModule, TracksModule],
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB, TracksService],
})
export class AppModule {}
