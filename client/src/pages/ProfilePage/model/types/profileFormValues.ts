import { Profile } from '@/entities/Profile';

export type ProfileFormValues = Omit<Profile, 'userId' | 'avatar'> & {
    avatar?: string | null;
};
