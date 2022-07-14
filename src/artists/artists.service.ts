import { Injectable, NotFoundException } from '@nestjs/common';
import InMemoryDB from 'src/DB/dataBase';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(private db: InMemoryDB) {}
  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = { ...createArtistDto, id: uuidv4() };
    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll(): Artist[] {
    return this.db.artists;
  }

  findOne(id: string): Artist {
    const artist = this.db.artists.find((item) => item.id === id);
    if (!artist) throw new NotFoundException();

    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const itemToUpd = this.findOne(id);
    if (!itemToUpd) throw new NotFoundException();
    Object.assign(itemToUpd, { ...updateArtistDto });

    return itemToUpd || null;
  }

  remove(id: string) {
    const itemToDel = this.findOne(id);
    if (!itemToDel) throw new NotFoundException();
    this.db.tracks = this.db.tracks.filter((item) => item.id !== id);

    return itemToDel || null;
  }
}
