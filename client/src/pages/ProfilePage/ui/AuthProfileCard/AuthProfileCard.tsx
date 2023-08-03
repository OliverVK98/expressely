import { useTranslation } from 'react-i18next';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { CurrencySelect } from '@/entities/Currency';
import { CountrySelect } from '@/entities/Country';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { FormInput, FormSelect } from '@/shared/ui/FormFields';
import { Profile } from '@/entities/Profile';
import { ProfileFormValues } from '../../model/types/profileFormValues';

interface AuthProfileCardProps {
    className?: string;
    authData?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
}

export const AuthProfileCard = (props: AuthProfileCardProps) => {
    const { className, readonly, authData, error, isLoading } = props;
    const { t } = useTranslation();
    const { reset } = useFormContext<ProfileFormValues>();

    useEffect(() => {
        if (authData) {
            reset({
                firstname: authData?.firstname,
                lastname: authData?.lastname,
                age: authData?.age,
                city: authData?.city,
                username: authData?.username,
                avatar: authData?.avatar,
                currency: authData.currency,
                country: authData.country,
            });
        }
    }, [authData, reset]);

    if (isLoading) {
        return (
            <Card className={className} padding="24" max border="default">
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
            <HStack max justify="center" className={className}>
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
        <Card border="default" max padding="24" className={className}>
            <VStack gap="32">
                {authData?.avatar && (
                    <HStack max justify="center">
                        <Avatar size={128} src={authData?.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <FormInput
                            errorMargin={10}
                            registerName="firstname"
                            label={t('Name')}
                            readonly={readonly}
                            data-testid="ProfileCard.firstname"
                            placeholder={t('First Name')}
                        />
                        <FormInput
                            errorMargin={10}
                            registerName="lastname"
                            label={t('Last Name')}
                            readonly={readonly}
                            data-testid="ProfileCard.lastname"
                            placeholder={t('Last Name')}
                        />
                        <FormInput
                            errorMargin={10}
                            registerName="age"
                            label={t('Age')}
                            readonly={readonly}
                            placeholder={t('Age')}
                        />
                        <FormInput
                            errorMargin={10}
                            registerName="city"
                            label={t('City')}
                            readonly={readonly}
                            placeholder={t('City')}
                        />
                    </VStack>
                    <VStack gap="24" max>
                        <FormInput
                            errorMargin={10}
                            registerName="username"
                            label={t('Username')}
                            readonly={readonly}
                            placeholder={t('Username')}
                        />
                        <FormInput
                            errorMargin={10}
                            registerName="avatar"
                            label={t('Avatar URL link')}
                            readonly={readonly}
                            placeholder={t('Avatar URL link')}
                        />
                        <FormSelect
                            SelectComponent={CountrySelect}
                            registerName="country"
                            defaultValue={authData?.country}
                        />
                        <FormSelect
                            SelectComponent={CurrencySelect}
                            registerName="currency"
                            defaultValue={authData?.currency}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
