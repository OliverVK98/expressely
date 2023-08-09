import { memo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJs,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { useGetArticlesAnalytics } from '../../model/api/analytics';
import { BarChartData, BarChartOptionsType } from '../../model/types/bar';
import cls from '../sharedStyles.module.scss';
import { Card } from '@/shared/ui/Card';

interface ArticleAnalyticsProps {
    className?: string;
}

ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
export const ArticleAnalytics = memo((props: ArticleAnalyticsProps) => {
    const { className } = props;
    const { data: chartData, error, isLoading } = useGetArticlesAnalytics();

    if (isLoading) return null;

    const data: BarChartData = {
        labels: Object.keys(chartData!),
        datasets: [
            {
                label: 'Articles Published',
                data: Object.values(chartData!),
                backgroundColor: 'aqua',
                borderColor: 'black',
                borderWidth: 1,
            },
        ],
    };

    const options: BarChartOptionsType = {};

    return (
        <Card padding="8">
            <Bar data={data} options={options} className={cls.chart} />
        </Card>
    );
});
