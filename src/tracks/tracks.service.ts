import { Injectable, NotFoundException } from '@nestjs/common';
import { InMemoryDB } from 'src/DB/dataBase';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(public db: InMemoryDB) {}

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = { ...createTrackDto, id: uuidv4() };
    this.db.tracks.push(newTrack);

    return newTrack;
  }

  findAll(): Track[] {
    return this.db.tracks;
  }

  findOne(id: string): Track {
    const track = this.db.tracks.find((item) => item.id === id);
    if (!track) throw new NotFoundException();

    return track || null;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const itemToUpd = this.findOne(id);
    if (!itemToUpd) throw new NotFoundException();
    Object.assign(itemToUpd, { ...updateTrackDto });

    return itemToUpd || null;
  }

  remove(id: string) {
    const itemToDel = this.findOne(id);
    if (!itemToDel) throw new NotFoundException();
    this.db.tracks = this.db.tracks.filter((item) => item.id !== id);

    return itemToDel || null;
  }
}
