import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Entity('artist')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artistId)
  tracks: Track[];

  @ManyToOne(() => Favorite, (favorite) => favorite.artists, {
    onDelete: 'SET NULL',
  })
  favorites: Favorite;
}
