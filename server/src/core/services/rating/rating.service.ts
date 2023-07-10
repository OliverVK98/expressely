import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from '../../entities/rating/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private repo: Repository<Rating>,
  ) {}

  create(rating: Rating) {
    const newRating = this.repo.create(rating);

    return this.repo.save(newRating);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
