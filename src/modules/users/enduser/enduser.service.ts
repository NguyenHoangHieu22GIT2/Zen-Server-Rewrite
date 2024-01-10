import { Injectable } from '@nestjs/common';
import { UpdateEnduserDto } from './dto/update-enduser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EndUser } from './entities/enduser.entity';
import { Model } from 'mongoose';
@Injectable()
export class EnduserService {
  constructor(
    @InjectModel(EndUser.name) private readonly EndUserModel: Model<EndUser>,
  ) {}

  findAll() {
    return `This action returns all enduser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} enduser`;
  }

  update(id: number, updateEnduserDto: UpdateEnduserDto) {
    return `This action updates a #${id} enduser`;
  }

  remove(id: number) {
    return `This action removes a #${id} enduser`;
  }
}
