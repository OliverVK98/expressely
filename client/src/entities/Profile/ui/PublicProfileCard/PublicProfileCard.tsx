import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { PublicProfile } from '../../index';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from '../ProfileCard/ProfileCard.module.scss';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';

interface PublicProfileCardProps {
    className?: string;
    data?: PublicProfile;
    error?: string;
    isLoading?: boolean;
}

export const PublicProfileCard = (props: PublicProfileCardProps) => {
    const { data, error, isLoading, className } = props;
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
                        </VStack>
                        <VStack gap="16" max>
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
                            readonly
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('Last Name')}
                            className={cls.input}
                            readonly
                            data-testid="ProfileCard.lastname"
                        />
                    </VStack>
                    <VStack gap="24" max>
                        <Input
                            value={data?.username}
                            label={t('Username')}
                            className={cls.input}
                            readonly
                        />
                        <Input
                            value={data?.age}
                            label={t('Age')}
                            className={cls.input}
                            readonly
                        />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
