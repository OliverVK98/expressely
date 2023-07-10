import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from '../../entities/rating/rating.entity';
import { RatingController } from '../../controllers/rating/rating.controller';
import { RatingService } from '../../services/rating/rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
