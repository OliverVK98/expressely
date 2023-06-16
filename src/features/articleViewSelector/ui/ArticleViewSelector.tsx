import { memo } from 'react';
import { Icon } from '@/shared/ui/Icon';
import { classNames } from '@/shared/lib/classNames/classNames';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TileIcon from '@/shared/assets/icons/tile.svg';
import cls from './ArticleViewSelector.module.scss';
import { ArticleView } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: TileIcon,
    },
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <Card
            border="round"
            className={classNames(cls.ArticleViewSelector, {}, [className])}
        >
            <HStack gap="8">
                {viewTypes.map((viewType) => (
                    <Icon
                        onClick={onClick(viewType.view)}
                        width={24}
                        height={24}
                        key={viewType.view}
                        clickable
                        className={classNames(
                            '',
                            {
                                [cls.notSelected]: viewType.view !== view,
                            },
                            [],
                        )}
                        Svg={viewType.icon}
                    />
                ))}
            </HStack>
        </Card>
    );
});
