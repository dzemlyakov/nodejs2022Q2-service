import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { dataBaseModule } from './DB/dataBase.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    UsersModule,
    dataBaseModule,
    FavoritesModule,
  ],
})
export class AppModule {}
