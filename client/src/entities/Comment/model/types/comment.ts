import { User } from '@/entities/User';

export interface Comment {
    id: number;
    user: Omit<User, 'roles' | 'features' | 'jsonSettings'>;
    text: string;
    createdAt: string;
}
