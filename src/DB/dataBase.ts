import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class InMemoryDB {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  users: User[] = [];
  favorites: Favorite = {
    albums: [],
    tracks: [],
    artists: [],
  };
  private static instance;
  constructor() {
    if (!InMemoryDB.instance) {
      InMemoryDB.instance = this;
    }
    return InMemoryDB.instance;
  }
}
