import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const newUser = this.userRepository.create({ ...createUserDto });

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const itemToUpd = await this.findOne(id);
    const { oldPassword, newPassword } = updateUserDto;
    const isMatch = await compare(oldPassword, itemToUpd.password);
    if (!isMatch) {
      throw new ForbiddenException('wrong old password');
    }
    itemToUpd.password = await this.hashPassword(newPassword);

    return await this.userRepository.save(itemToUpd);
  }

  async remove(id: string) {
    const itemToDel = await this.userRepository.delete(id);
    if (!itemToDel.affected) throw new NotFoundException();

    return { deleted: true };
  }

  private hashPassword(password: string) {
    return hash(password, +this.configService.get('CRYPT_SALT'));
  }
}
