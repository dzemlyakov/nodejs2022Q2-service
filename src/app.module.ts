import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { dataBaseModule } from './DB/dataBase.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    UsersModule,
    dataBaseModule,
    FavoritesModule,
  ],
})
export class AppModule {}
