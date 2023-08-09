import { memo } from 'react';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { Profile, PublicProfile } from '@/entities/Profile';

import cls from './EditableProfileCard.module.scss';
import { AuthProfileCard } from '../AuthProfileCard/AuthProfileCard';
import { PublicProfileCard } from '../PublicProfileCard/PublicProfileCard';
import { ProfileFeedSettings } from '../ProfileFeedSettings/ProfileFeedSettings';
import { UserPublishedArticles } from '../UserPublishedArticles/UserPublishedArticles';

interface EditableProfileCardProps {
    className?: string;
    isAuthUserProfile: boolean;
    authData?: Profile;
    publicData?: PublicProfile;
    id: number;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, isAuthUserProfile, authData, publicData, id } = props;
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.EditableProfileCard, {}, [className])}
        >
            {isAuthUserProfile ? (
                <VStack max gap="16" className={className}>
                    <AuthProfileCard
                        authData={authData}
                        isLoading={isLoading}
                        error={error}
                        readonly={readonly}
                    />
                    <ProfileFeedSettings />
                </VStack>
            ) : (
                <VStack max gap="16" className={className}>
                    <PublicProfileCard
                        data={publicData}
                        isLoading={isLoading}
                        error={error}
                    />
                    <UserPublishedArticles id={id} />
                </VStack>
            )}
        </VStack>
    );
});
