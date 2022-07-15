import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDB } from 'src/DB/dataBase';
import { dataBaseModule } from 'src/DB/dataBase.module';

@Module({
  imports: [dataBaseModule],
  controllers: [UsersController],
  providers: [UsersService, InMemoryDB],
})
export class UsersModule {}
