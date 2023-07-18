import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CommentDto } from '../../dtos/comment/comment.dto';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentSerializer {
  serialize(comment: Comment) {
    return plainToClass(CommentDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  serializeMany(comments: Comment[]) {
    return comments.map((comment) => this.serialize(comment));
  }
}
