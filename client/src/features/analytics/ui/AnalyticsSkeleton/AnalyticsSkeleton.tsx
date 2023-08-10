import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';

interface AnalyticsSkeletonProps {
    className?: string;
}

export const AnalyticsSkeleton = memo((props: AnalyticsSkeletonProps) => {
    const { className } = props;

    return (
        <Card className={classNames('', {}, [className])}>
            <Skeleton width={450} height={225} />
        </Card>
    );
});
