import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import InMemoryDB from 'src/DB/dataBase';

@Module({
  controllers: [TracksController],
  providers: [TracksService, InMemoryDB],
  exports: [TracksService],
})
export class TracksModule {}
