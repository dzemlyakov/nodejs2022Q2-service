import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
    if (!itemToUpd) throw new NotFoundException();

    const { oldPassword, newPassword } = updateUserDto;
    if (oldPassword !== itemToUpd.password) {
      throw new ForbiddenException('wrong old password');
    }
    itemToUpd.password = newPassword;

    return await this.userRepository.save(itemToUpd);
  }

  async remove(id: string) {
    const itemToDel = await this.userRepository.delete(id);
    if (!itemToDel.affected) throw new NotFoundException();

    return { deleted: true };
  }
}
