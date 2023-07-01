import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { sidebarMemoItems } from '../../model/const/sidebar';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import cls from './ArticleCreatePageSidebar.module.scss';

interface AuthorsMemoProps {
    className?: string;
}

export const AuthorsMemo = memo((props: AuthorsMemoProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Card padding="24" className={className} border="partial">
            <VStack max gap="16">
                <Text
                    align="center"
                    text={t('MEMO TO THE AUTHOR')}
                    bold
                    className={cls.text}
                />
                {sidebarMemoItems.map((item, index) => (
                    <HStack gap="8" max key={index}>
                        <Icon
                            height={item.size}
                            className={cls.icon}
                            width={item.size}
                            Svg={item.icon}
                        />
                        <Text size="s" text={item.text} />
                    </HStack>
                ))}
            </VStack>
        </Card>
    );
});
