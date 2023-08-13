import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { ProjectInfo } from '../../model/const/const';
import cls from './AboutPageContentSwitcher.module.scss';

interface AboutPageContentSwitcherProps {
    className?: string;
    value: ProjectInfo;
    onChangeType: (type: ProjectInfo) => void;
}

export const AboutPageContentSwitcher = memo(
    (props: AboutPageContentSwitcherProps) => {
        const { className, value, onChangeType } = props;
        const { t } = useTranslation();

        const typeTabs = useMemo<TabItem[]>(
            () => [
                {
                    value: ProjectInfo.AboutWebsite,
                    content: t('About Website'),
                },
                {
                    value: ProjectInfo.TechStack,
                    content: t('Tech Stack'),
                },
            ],
            [t],
        );

        const onTabClick = useCallback(
            (tab: TabItem) => {
                onChangeType(tab.value as ProjectInfo);
            },
            [onChangeType],
        );

        return (
            <Card className={className}>
                <VStack max align="center" gap="32" className={cls.textAlign}>
                    <Text text={t('Project Overview')} bold size="l" />
                    <Tabs
                        direction="column"
                        tabs={typeTabs}
                        value={value}
                        onTabClick={onTabClick}
                        max
                    />
                </VStack>
            </Card>
        );
    },
);
