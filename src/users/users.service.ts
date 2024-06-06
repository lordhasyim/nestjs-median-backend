import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

export const roundOfHashing = 10;

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}
  
  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundOfHashing
    );

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto
    });
  }

  findAll() {
    // return `This action returns all users`;
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    // return `This action returns a #${id} user`;
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundOfHashing
      )
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto
    });
  }

  remove(id: number) {
    // return `This action removes a #${id} user`;
    return this.prisma.user.delete({ where: { id } });
  }
}
