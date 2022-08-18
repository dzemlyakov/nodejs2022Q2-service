import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Album } from './entities/album.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => FavoritesModule),
    forwardRef(() => TracksModule),
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
