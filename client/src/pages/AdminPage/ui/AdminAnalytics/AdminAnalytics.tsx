import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { HStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import {
    ArticlesAnalytics,
    ChartType,
    ChartYear,
    CommentsAnalytics,
    UsersAnalytics,
    ViewsAnalytics,
} from '@/features/analytics';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import cls from './AdminAnalytics.module.scss';

export const AdminAnalytics = memo(() => {
    const { t } = useTranslation();
    const [currentYear, setCurrentYear] = useState(ChartYear.YEAR2023);
    const [chartType, setChartType] = useState(ChartType.BAR);
    const { color } = useTheme();

    const onLastYearClick = useCallback(() => {
        setCurrentYear(ChartYear.YEAR2022);
    }, []);

    const onThisYearClick = useCallback(() => {
        setCurrentYear(ChartYear.YEAR2023);
    }, []);

    const onBarChartButtonClick = useCallback(() => {
        setChartType(ChartType.BAR);
    }, []);

    const onLineChartButtonClick = useCallback(() => {
        setChartType(ChartType.LINE);
    }, []);

    return (
        <>
            <Card max padding="16">
                <Text text={t('Website Analytics')} align="center" bold />
            </Card>
            <HStack max className={cls.buttonsContainer}>
                <Card padding="0" className={cls.cardWrapper}>
                    <HStack max>
                        <Button
                            className={cls.button}
                            variant={
                                currentYear === ChartYear.YEAR2022
                                    ? 'highlighted'
                                    : 'clear'
                            }
                            onClick={onLastYearClick}
                        >
                            {t('2022')}
                        </Button>
                        <Button
                            className={cls.button}
                            variant={
                                currentYear === ChartYear.YEAR2023
                                    ? 'highlighted'
                                    : 'clear'
                            }
                            onClick={onThisYearClick}
                        >
                            {t('2023')}
                        </Button>
                    </HStack>
                </Card>
                <Card padding="0" className={cls.cardWrapper}>
                    <HStack max>
                        <Button
                            className={cls.button}
                            variant={
                                chartType === ChartType.BAR
                                    ? 'highlighted'
                                    : 'clear'
                            }
                            onClick={onBarChartButtonClick}
                        >
                            {t('Bar Chart')}
                        </Button>
                        <Button
                            className={cls.button}
                            variant={
                                chartType === ChartType.LINE
                                    ? 'highlighted'
                                    : 'clear'
                            }
                            onClick={onLineChartButtonClick}
                        >
                            {t('Line Chart')}
                        </Button>
                    </HStack>
                </Card>
            </HStack>
            <div className={cls.chartGrid}>
                <ArticlesAnalytics
                    currentYear={currentYear}
                    chartType={chartType}
                    color={color}
                />
                <UsersAnalytics
                    currentYear={currentYear}
                    chartType={chartType}
                    color={color}
                />
                <ViewsAnalytics
                    currentYear={currentYear}
                    chartType={chartType}
                    color={color}
                />
                <CommentsAnalytics
                    currentYear={currentYear}
                    chartType={chartType}
                    color={color}
                />
            </div>
        </>
    );
});
