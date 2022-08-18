import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/tracks/entities/track.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.id, { onDelete: 'SET NULL' })
  artist: Artist;

  @OneToMany(() => Track, (track) => track.albumId)
  tracks: Track[];

  @ManyToOne(() => Favorite, (favorite) => favorite.albums, {
    onDelete: 'SET NULL',
  })
  favorites: Favorite;
}
