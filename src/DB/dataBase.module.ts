import { Global, Module } from '@nestjs/common';
import { InMemoryDB } from './dataBase';

@Global()
@Module({
  providers: [InMemoryDB],
  exports: [InMemoryDB],
})
export class dataBaseModule {}
