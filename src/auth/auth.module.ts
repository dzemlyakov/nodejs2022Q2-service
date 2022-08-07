import { Module } from '@nestjs/common';

import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, ConfigModule.forRoot(), JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
