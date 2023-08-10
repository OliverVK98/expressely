import { memo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJs,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { useGetViewsAnalytics } from '../../model/api/analytics';
import {
    BarChartData,
    BarChartOptionsType,
    LineChartData,
    LineChartOptionsType,
} from '../../model/types/bar';
import cls from '../sharedStyles.module.scss';
import { Card } from '@/shared/ui/Card';
import { ChartType, ChartYear } from '../../model/types/charts';
import { AnalyticsSkeleton } from '../AnalyticsSkeleton/AnalyticsSkeleton';

interface ViewsAnalyticsProps {
    className?: string;
    currentYear: ChartYear;
    chartType: ChartType;
    color: string;
}

ChartJs.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
);
export const ViewsAnalytics = memo((props: ViewsAnalyticsProps) => {
    const { className, currentYear, chartType, color } = props;
    const {
        data: chartData,
        error,
        isLoading,
    } = useGetViewsAnalytics(currentYear);

    if (isLoading) return <AnalyticsSkeleton />;

    const barChartData: BarChartData = {
        labels: Object.keys(chartData!),
        datasets: [
            {
                label: `First Time Article Views`,
                data: Object.values(chartData!),
                backgroundColor: color,
                borderWidth: 1,
            },
        ],
    };

    const lineChartData: LineChartData = {
        labels: Object.keys(chartData!),
        datasets: [
            {
                label: 'First Time Article Views',
                data: Object.values(chartData!),
                fill: true,
                borderColor: color,
                tension: 0.5,
                borderWidth: 2,
            },
        ],
    };

    const barChartOptions: BarChartOptionsType = {};
    const lineChartOptions: LineChartOptionsType = {};

    return (
        <Card padding="8" className={className}>
            {chartType === ChartType.BAR && (
                <Bar
                    data={barChartData}
                    options={barChartOptions}
                    className={cls.chart}
                />
            )}
            {chartType === ChartType.LINE && (
                <Line
                    data={lineChartData}
                    options={lineChartOptions}
                    className={cls.chart}
                />
            )}
        </Card>
    );
});
