import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private notificationService: CommentService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    const comment = await this.notificationService.findOne(+id);
    return comment;
  }
}
