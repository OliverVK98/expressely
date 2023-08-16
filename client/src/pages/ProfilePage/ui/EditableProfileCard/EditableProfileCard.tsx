import { memo } from 'react';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack';
import { Profile, PublicProfile } from '@/entities/Profile';
import { AuthProfileCard } from '../AuthProfileCard/AuthProfileCard';
import { PublicProfileCard } from '../PublicProfileCard/PublicProfileCard';
import { ProfileFeedSettings } from '../ProfileFeedSettings/ProfileFeedSettings';
import { UserPublishedArticles } from '../UserPublishedArticles/UserPublishedArticles';
import {
    getProfileError,
    getProfileIsLoading,
    getProfileReadonly,
} from '../../model/selectors/getProfileSelectors';

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
        <VStack gap="8" max className={className}>
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
