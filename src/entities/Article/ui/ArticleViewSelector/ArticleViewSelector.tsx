import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleView } from 'entities/Article';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TileIcon from 'shared/assets/icons/tile-24-24.svg';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { Icon } from 'shared/ui/Icon';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView,
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
    const { t } = useTranslation();

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {
                viewTypes.map((viewType) => (
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={onClick(viewType.view)}
                        key={viewType.view}

                    >
                        <Icon
                            className={classNames(
                                '',
                                { [cls.notSelected]: viewType.view !== view },
                                [],
                            )}
                            Svg={viewType.icon}
                        />
                    </Button>
                ))
            }
        </div>
    );
});
