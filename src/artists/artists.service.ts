import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create({ ...createArtistDto });

    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new NotFoundException();

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const itemToUpd = await this.findOne(id);
    if (!itemToUpd) throw new NotFoundException();

    const updatedArtist = Object.assign(itemToUpd, { ...updateArtistDto });

    return await this.artistRepository.save(updatedArtist);
  }

  async remove(id: string) {
    const itemToDel = await this.artistRepository.delete(id);
    if (!itemToDel.affected) throw new NotFoundException();

    return { deleted: true };
  }
}

// async remove(id: string) {
//   const itemToDel = this.findOne(id);
//   if (!itemToDel) throw new NotFoundException();

//   this.db.tracks.forEach((track) => {
//     if (track.artistId === id) track.artistId = null;
//   });

//   this.db.albums.forEach((album) => {
//     if (album.artistId === id) album.artistId = null;
//   });

//   this.db.favorites.artists = this.db.favorites.artists.filter(
//     (item) => item.id !== id,
//   );

//   this.db.artists = this.db.artists.filter((item) => item.id !== id);

//   return itemToDel || null;
// }
