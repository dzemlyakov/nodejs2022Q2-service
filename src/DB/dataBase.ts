import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Injectable()
export class InMemoryDB {
  albums: Album[] = [];
  tracks: Track[] = [];
}

export default InMemoryDB;
