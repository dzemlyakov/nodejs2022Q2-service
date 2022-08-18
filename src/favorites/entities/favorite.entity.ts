import { Exclude } from 'class-transformer';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity('favorite')
export class Favorite {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.favorites)
  artists: Artist[];

  @OneToMany(() => Album, (album) => album.favorites)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.favorites)
  tracks: Track[];
}
