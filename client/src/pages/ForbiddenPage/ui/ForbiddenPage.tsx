import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page
            data-testid="MainPage"
            className={classNames('', {}, [className])}
        >
            <Card max padding="16">
                <Text
                    size="l"
                    bold
                    align="center"
                    text={t('You dont have access to view this page')}
                />
            </Card>
        </Page>
    );
});

export default ForbiddenPage;
