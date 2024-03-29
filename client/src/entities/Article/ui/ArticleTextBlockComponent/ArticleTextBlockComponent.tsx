import { memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleTextBlock } from '../../model/types/article';
import cls from './ArticleTextBlockComponent.module.scss';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(cls.ArticleTextBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <Text title={block.title} className={cls.title} bold />
                )}
                {block.subtitle && <Text title={block.subtitle} />}
                {block.paragraphs.map((paragraph) => {
                    if (paragraph === '') return null;
                    return (
                        <Text
                            key={paragraph}
                            text={paragraph}
                            className={cls.paragraph}
                        />
                    );
                })}
            </div>
        );
    },
);
