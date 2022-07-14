import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class InMemoryDB {
  albums: Album[] = [];
}

export default InMemoryDB;
