import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InMemoryDB } from 'src/DB/dataBase';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(private db: InMemoryDB) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = { ...createAlbumDto, id: uuidv4() };
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.db.albums;
  }

  findOne(id: string): Album {
    return this.db.albums.find((item) => item.id === id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const itemToUpd = this.findOne(id);
    Object.assign(itemToUpd, { ...updateAlbumDto });
    return itemToUpd || null;
  }

  remove(id: string) {
    const itemToDel = this.findOne(id);
    this.db.albums = this.db.albums.filter((item) => item.id !== id);
    return itemToDel || null;
  }
}