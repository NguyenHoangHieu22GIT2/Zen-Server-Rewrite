import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LikeController, Like, LikeSchema } from './';
import { LikeRepository } from './repository/like.repository';
import { LikeService } from './services/like.service';
import { ILikeServiceString } from './services/like.interface';
import { BaseRepositoryName } from 'src/cores/base-repository/Base.Repository.interface';

@Module({
  controllers: [LikeController],
  providers: [
    {
      provide: ILikeServiceString,
      useClass: LikeService,
    },
    {
      provide: BaseRepositoryName,
      useClass: LikeRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  exports: [
    {
      provide: ILikeServiceString,
      useClass: LikeService,
    },
  ],
})
export class LikeModule {}
