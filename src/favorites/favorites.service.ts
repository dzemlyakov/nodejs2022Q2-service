import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InMemoryDB } from 'src/DB/dataBase';

@Injectable()
export class FavoritesService {
  constructor(public db: InMemoryDB) {}

  addTrack(id: string) {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) throw new UnprocessableEntityException();
    this.db.favorites.tracks.push(track);

    return track;
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new UnprocessableEntityException();
    this.db.favorites.artists.push(artist);

    return artist;
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) throw new UnprocessableEntityException();
    this.db.favorites.albums.push(album);

    return album;
  }

  findAll() {
    console.log("find", this.db.favorites.artists);
    
    return this.db.favorites;
  }

  removeTrack(id: string) {
    const itemToDel = this.db.favorites.tracks.find((track) => track.id === id);
    if (!itemToDel) throw new NotFoundException();

    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (item) => item.id !== id,
    );
  }

  removeArtist(id: string) {
    const itemToDel = this.db.favorites.artists.find(
      (artist) => artist.id === id,
    );
    if (!itemToDel) throw new NotFoundException();

    this.db.favorites.artists = this.db.favorites.artists.filter(
      (item) => item.id !== id,
    );
    console.log("after", this.db.favorites.artists);
    return;
  }

  removeAlbum(id: string) {
    const itemToDel = this.db.favorites.albums.find((album) => album.id === id);
    if (!itemToDel) throw new NotFoundException();

    this.db.favorites.albums = this.db.favorites.albums.filter(
      (item) => item.id !== id,
    );
  }
}
