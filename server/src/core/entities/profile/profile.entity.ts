import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id?: number;

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

  @Column()
  avatar: string;

  @OneToOne(() => User, (user) => user.profile)
  user?: User;
}
