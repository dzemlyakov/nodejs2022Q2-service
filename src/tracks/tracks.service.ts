import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.trackRepository.create({ ...createTrackDto });

    return await this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new NotFoundException();

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const itemToUpd = await this.findOne(id);
    const updatedTrack = Object.assign(itemToUpd, { ...updateTrackDto });

    return await this.trackRepository.save(updatedTrack);
  }

  async remove(id: string) {
    const itemToDel = await this.trackRepository.delete(id);
    if (!itemToDel.affected) throw new NotFoundException();

    return { deleted: true };
  }
}
