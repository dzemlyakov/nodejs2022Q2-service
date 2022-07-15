import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { dataBaseModule } from './DB/dataBase.module';

@Module({
  imports: [
    AlbumsModule,
    TracksModule,
    ArtistsModule,
    UsersModule,
    dataBaseModule,
  ],
})
export class AppModule {}
