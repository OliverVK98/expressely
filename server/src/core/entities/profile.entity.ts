import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'profiles' })
export class Profile extends AbstractEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  age: number;

  @Column()
  currency: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  avatar: string | null;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
