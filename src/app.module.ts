import { Module } from '@nestjs/common';

import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [AlbumsModule, TracksModule, ArtistsModule],
})
export class AppModule {}
