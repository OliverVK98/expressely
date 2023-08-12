import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import { UserArticleType } from '../../model/consts/consts';

interface ArticleTypeSelectProps {
    className?: string;
    value?: UserArticleType;
    onChange?: (value: UserArticleType) => void;
    readonly?: boolean;
    label?: string;
}

const options = Object.keys(UserArticleType).map((key) => ({
    value: UserArticleType[key as keyof typeof UserArticleType],
    content: UserArticleType[key as keyof typeof UserArticleType],
}));

export const ArticleTypeSelect = memo((props: ArticleTypeSelectProps) => {
    const { className, value, onChange, readonly, label } = props;

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as UserArticleType);
        },
        [onChange],
    );

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            label={label}
            items={options}
            className={classNames('', {}, [className])}
            readonly={readonly}
            direction="bottomRight"
        />
    );
});
