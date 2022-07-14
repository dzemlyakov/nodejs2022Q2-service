import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class InMemoryDB {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
}

export default InMemoryDB;
