import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/Card';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';
import { Avatar } from '@/shared/ui/Avatar';
import { Input } from '@/shared/ui/Input';
import { PublicProfile } from '@/entities/Profile';

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
            <Card className={className} padding="24" max border="default">
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
                {data?.avatar && (
                    <HStack max justify="center">
                        <Avatar size={128} src={data?.avatar} />
                    </HStack>
                )}
                <HStack gap="24" max>
                    <VStack gap="16" max>
                        <Input
                            value={data?.firstname}
                            label={t('Name')}
                            readonly
                            data-testid="ProfileCard.firstname"
                        />
                        <Input
                            value={data?.lastname}
                            label={t('Last Name')}
                            readonly
                            data-testid="ProfileCard.lastname"
                        />
                    </VStack>
                    <VStack gap="24" max>
                        <Input
                            value={data?.username}
                            label={t('Username')}
                            readonly
                        />
                        <Input value={data?.age} label={t('Age')} readonly />
                    </VStack>
                </HStack>
            </VStack>
        </Card>
    );
};
