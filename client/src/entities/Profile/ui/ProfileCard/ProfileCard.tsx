import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { Country, CountrySelect } from '@/entities/Country';
import {
    EditableProfileFields,
    PublicProfile,
} from '../../model/types/profileSchema';
import cls from './ProfileCard.module.scss';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';

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
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <Card padding="24" max border="default">
                <VStack gap="32">
                    <HStack max justify="center">
                        <Skeleton border="100%" width={128} height={128} />
                    </HStack>
                    <HStack gap="32" max>
                        <VStack gap="16" max>
                            <Skeleton width="100%" height={38} />
                            <Skeleton width="100%" height={38} />
                            <Skeleton width="100%" height={38} />
                            <Skeleton width="100%" height={38} />
                        </VStack>
                        <VStack gap="16" max>
                            <Skeleton width="100%" height={38} />
                            <Skeleton width="100%" height={38} />
                            <Skeleton width="100%" height={38} />
                            <Skeleton width="100%" height={38} />
                        </VStack>
                    </HStack>
                </VStack>
            </Card>
        );
    }

    if (error) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                <Text
                    variant="error"
                    title={t('Error occurred while loading profile')}
                    text={t('Try refreshing the page')}
                    align="center"
                />
            </HStack>
        );
    }

    return (
        <Card
            border="default"
            max
            padding="24"
            className={classNames(cls.ProfileCard, {}, [className])}
        >
            <VStack gap="32">
                {data?.avatar && (
                    <HStack max justify="center" className={cls.avatarWrapper}>
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.firstname}
                            label={t('Name')}
                            className={cls.input}
                            onChange={onChangeFirstName}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('Last Name')}
                            className={cls.input}
                            onChange={onChangeLastName}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                        />
                        <Input
                            value={data?.age}
                            label={t('Age')}
                            className={cls.input}
                            onChange={onChangeAge}
                            readonly={readonly}
                        />
                        {/* TODO: FIX THIS TS */}
                        {isAuthUserProfile && 'city' in data! && (
                            <Input
                                value={data?.city}
                                label={t('City')}
                                className={cls.input}
                                onChange={onChangeCity}
                                readonly={readonly}
                            />
                        )}
                    </VStack>
                    <VStack gap="16" max>
                        <Input
                            value={data?.username}
                            label={t('Username')}
                            className={cls.input}
                            onChange={onChangeUsername}
                            readonly={readonly}
                        />
                        <Input
                            value={data?.avatar}
                            label={t('Avatar URL link')}
                            className={cls.input}
                            onChange={onChangeAvatar}
                            readonly={readonly}
                        />
                        {/* TODO: FIX THIS TS */}
                        {isAuthUserProfile && 'currency' in data! && (
                            <CurrencySelect
                                className={cls.input}
                                onChange={onChangeCurrency}
                                value={data?.currency}
                                readonly={readonly}
                            />
                        )}
                        {/* TODO: FIX THIS TS */}
                        {isAuthUserProfile && 'country' in data! && (
                            <CountrySelect
                                className={cls.input}
                                onChange={onChangeCountry}
                                value={data?.country}
                                readonly={readonly}
                            />
                        )}
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
