import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DiscoverArticlesEmpty.module.scss';
import { Button } from '@/shared/ui/Button';
import { getRouteUserProfile } from '@/shared/const/router';

interface DiscoverArticleEmptyProps {
    className?: string;
}

export const DiscoverArticleEmpty = (props: DiscoverArticleEmptyProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Card
            border="default"
            max
            padding="24"
            className={classNames(cls.DiscoverArticleEmpty, {}, [className])}
        >
            <Text
                align="center"
                size="l"
                bold
                text={t(
                    'You currently have no selected preferences in your profile',
                )}
                className={cls.text}
            />
            <Button
                onClick={() => navigate(getRouteUserProfile())}
                className={cls.button}
            >
                {t('Go to Profile')}
            </Button>
        </Card>
    );
};
