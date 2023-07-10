import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from '../../services/comment/comment.service';

@Controller('user')
export class CommentController {
  constructor(private notificationService: CommentService) {}

  @Get('/id')
  async getUser(@Param('id') id: string) {
    const comment = await this.notificationService.findOne(+id);
    return comment;
  }
}
