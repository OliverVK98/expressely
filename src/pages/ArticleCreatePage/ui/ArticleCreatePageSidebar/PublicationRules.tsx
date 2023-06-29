import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { sidebarPublicationRules } from '../../model/const/sidebar';
import { Text } from '@/shared/ui/Text';
import cls from './ArticleCreatePageSidebar.module.scss';

interface PublicationRulesProps {
    className?: string;
}

export const PublicationRules = memo((props: PublicationRulesProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Card padding="24" className={className} border="partial">
            <VStack max gap="8">
                <Text
                    align="center"
                    text={t('PUBLICATION RULES')}
                    bold
                    className={cls.text}
                />
                <VStack max gap="4">
                    <Text text={t("Don't publish: ")} />
                    <ul>
                        <VStack max gap="8">
                            {sidebarPublicationRules.map((item, index) => (
                                <li className={cls.list} key={index}>
                                    <Text text={item} />
                                </li>
                            ))}
                        </VStack>
                    </ul>
                </VStack>
            </VStack>
        </Card>
    );
});
