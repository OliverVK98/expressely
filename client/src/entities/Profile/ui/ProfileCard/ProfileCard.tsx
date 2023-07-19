import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import {
    EditableProfileFields,
    PublicProfile,
} from '../../model/types/profileSchema';
import { AuthProfileCard } from '../AuthProfileCard/AuthProfileCard';
import { PublicProfileCard } from '../PublicProfileCard/PublicProfileCard';

interface ProfileCardProps {
    className?: string;
    data?: EditableProfileFields | PublicProfile;
    error?: string;
    isLoading?: boolean;
    onChangeLastName?: (value?: string) => void;
    onChangeFirstName?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (value?: Currency) => void;
    onChangeCountry?: (country?: Country) => void;
    readonly?: boolean;
    isAuthUserProfile: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        data,
        error,
        isLoading,
        className,
        onChangeLastName,
        onChangeFirstName,
        onChangeAge,
        onChangeCity,
        readonly,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
        isAuthUserProfile,
    } = props;

    function isAuthProfile(
        data: EditableProfileFields | PublicProfile | undefined,
    ): data is EditableProfileFields {
        return (
            data !== undefined &&
            (data as EditableProfileFields).city !== undefined
        );
    }

    if (isAuthUserProfile && isAuthProfile(data)) {
        return (
            <AuthProfileCard
                data={data}
                className={className}
                isLoading={isLoading}
                error={error}
                onChangeFirstName={onChangeFirstName}
                onChangeLastName={onChangeLastName}
                readonly={readonly}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeAvatar={onChangeAvatar}
                onChangeUsername={onChangeUsername}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
            />
        );
    }
    return (
        <PublicProfileCard
            data={data}
            className={className}
            isLoading={isLoading}
            error={error}
            onChangeFirstName={onChangeFirstName}
            onChangeLastName={onChangeLastName}
            onChangeAge={onChangeAge}
            onChangeUsername={onChangeUsername}
        />
    );
};
