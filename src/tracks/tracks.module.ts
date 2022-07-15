import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { dataBaseModule } from 'src/DB/dataBase.module';

@Module({
  imports: [dataBaseModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
