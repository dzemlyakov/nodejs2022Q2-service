import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = this.albumRepository.create({ ...createAlbumDto });

    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new NotFoundException();

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const itemToUpd = await this.findOne(id);
    if (!itemToUpd) throw new NotFoundException();

    const updatedAlbum = Object.assign(itemToUpd, { ...updateAlbumDto });

    return await this.albumRepository.save(updatedAlbum);
  }

  async remove(id: string) {
    const itemToDel = await this.albumRepository.delete(id);
    if (!itemToDel.affected) throw new NotFoundException();

    return { deleted: true };
  }
}
