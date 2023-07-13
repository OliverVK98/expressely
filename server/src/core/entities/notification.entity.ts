import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'notifications' })
export class Notification extends AbstractEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.notifications)
  user: User;
}
