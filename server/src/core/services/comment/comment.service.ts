import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../../entities/comment/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
  ) {}

  create(comment: Comment) {
    const newComment = this.repo.create(comment);

    return this.repo.save(newComment);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
