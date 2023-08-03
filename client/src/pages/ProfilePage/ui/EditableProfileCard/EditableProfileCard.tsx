import { useTranslation } from 'react-i18next';
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

interface EditableProfileCardProps {
    className?: string;
    isAuthUserProfile: boolean;
    authData?: Profile;
    publicData?: PublicProfile;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, isAuthUserProfile, authData, publicData } = props;
    const { t } = useTranslation();
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
                <AuthProfileCard
                    authData={authData}
                    className={className}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                />
            ) : (
                <PublicProfileCard
                    data={publicData}
                    className={className}
                    isLoading={isLoading}
                    error={error}
                />
            )}
        </VStack>
    );
});
