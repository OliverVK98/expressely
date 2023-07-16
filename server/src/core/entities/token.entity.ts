import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'tokens' })
export class Token extends AbstractEntity {
  @Column()
  refreshToken: string;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn()
  user: User;
}
