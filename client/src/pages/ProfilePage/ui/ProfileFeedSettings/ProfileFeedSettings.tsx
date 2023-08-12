import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { FeedArticleTypeTabCard } from '@/features/feedArticleTypeTabCard';
import { articleFeedTypeDescription } from '@/entities/Article';
import { getUserAuthData } from '@/entities/User';

interface ProfileFeedSettingsProps {
    className?: string;
}

export const ProfileFeedSettings = memo((props: ProfileFeedSettingsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const userAuthData = useSelector(getUserAuthData);

    return (
        <Card max padding="24" className={className}>
            <VStack max gap="8">
                <Text size="l" text={t('Feed Settings')} />
                <VStack max gap="16">
                    {articleFeedTypeDescription.map((type) => (
                        <FeedArticleTypeTabCard
                            Svg={type.icon}
                            text={type.description}
                            title={type.title}
                            key={type.description}
                            userAuthData={userAuthData}
                        />
                    ))}
                </VStack>
            </VStack>
        </Card>
    );
});
