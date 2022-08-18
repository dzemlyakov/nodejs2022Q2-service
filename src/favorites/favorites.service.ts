import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Favorite } from './entities/favorite.entity';

import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private favoritesRepository: Repository<Favorite>,
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,
  ) {}

  async getFavorites() {
    const favorites = await this.favoritesRepository.findOne({
      where: {},
      relations: ['artists', 'albums', 'tracks'],
    });
    if (favorites) return favorites;

    const createdFavorites = this.favoritesRepository.create({
      artists: [],
      albums: [],
      tracks: [],
    });

    return await this.favoritesRepository.save(createdFavorites);
  }

  async findAll(): Promise<Favorite> {
    return await this.getFavorites();
  }

  async addTrack(id: string) {
    try {
      const track = await this.tracksService.findOne(id);
      if (!track) throw new UnprocessableEntityException();
      const favorites = await this.getFavorites();
      favorites.tracks.push(track);

      return await this.favoritesRepository.save(favorites);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.artistsService.findOne(id);

      if (!artist) throw new UnprocessableEntityException();
      const favorites = await this.getFavorites();
      favorites.artists.push(artist);

      return await this.favoritesRepository.save(favorites);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.albumsService.findOne(id);
      const favorites = await this.getFavorites();
      favorites.albums.push(album);

      return await this.favoritesRepository.save(favorites);
    } catch {
      throw new UnprocessableEntityException();
    }
  }

  async removeTrack(id: string) {
    const favorites = await this.getFavorites();
    const itemToDel = favorites.tracks.find((track) => track.id === id);
    if (!itemToDel) throw new NotFoundException();

    favorites.tracks = favorites.tracks.filter((item) => item.id !== id);

    await this.favoritesRepository.save(favorites);
  }

  async removeArtist(id: string) {
    const favorites = await this.getFavorites();
    const itemToDel = favorites.artists.find((artist) => artist.id === id);
    if (!itemToDel) throw new NotFoundException();

    favorites.artists = favorites.artists.filter((item) => item.id !== id);

    await this.favoritesRepository.save(favorites);
  }

  async removeAlbum(id: string) {
    const favorites = await this.getFavorites();
    const itemToDel = favorites.albums.find((album) => album.id === id);
    if (!itemToDel) throw new NotFoundException();

    favorites.albums = favorites.albums.filter((item) => item.id !== id);

    await this.favoritesRepository.save(favorites);
  }
}
