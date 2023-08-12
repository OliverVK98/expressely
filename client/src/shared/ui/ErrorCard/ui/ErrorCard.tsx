import { useTranslation } from 'react-i18next';
import { Text } from '../../Text';
import { Card } from '../../Card';

interface ErrorCardProps {
    className?: string;
}

export const ErrorCard = (props: ErrorCardProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <Card max padding="24" className={className}>
            <Text
                variant="error"
                align="center"
                text={t('Something went wrong. Try refreshing the page')}
            />
        </Card>
    );
};
