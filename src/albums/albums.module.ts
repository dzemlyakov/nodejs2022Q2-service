import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import InMemoryDB from 'src/DB/dataBase';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, InMemoryDB],
  exports: [AlbumsService],
})
export class AlbumsModule {}
