import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InMemoryDB } from 'src/DB/dataBase';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDB) {}

  create(createUserDto: CreateUserDto) {
    const newUser = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.db.users.push(newUser);

    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const user = this.db.users.find((item) => item.id === id);
    if (!user) throw new NotFoundException();

    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const itemToUpd = this.findOne(id);
    if (!itemToUpd) throw new NotFoundException();

    const { oldPassword, newPassword } = updateUserDto;
    if (oldPassword !== itemToUpd.password) {
      throw new ForbiddenException('wrong old password');
    }

    Object.assign(itemToUpd, {
      version: itemToUpd.version + 1,
      updatedAt: Date.now(),
      password: newPassword,
    });

    return itemToUpd || null;
  }

  remove(id: string) {
    const itemToDel = this.findOne(id);
    if (!itemToDel) throw new NotFoundException();
    this.db.users = this.db.users.filter((item) => item.id !== id);

    return itemToDel || null;
  }
}
