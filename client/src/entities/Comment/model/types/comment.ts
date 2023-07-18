import { User } from '@/entities/User';

export interface Comment {
    id: string;
    user: Omit<User, 'roles' | 'features' | 'jsonSettings'>;
    text: string;
    createdAt: Date;
}
