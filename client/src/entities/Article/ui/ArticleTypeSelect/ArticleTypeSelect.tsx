import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/Popups';
import { ArticleType } from '../../model/consts/consts';

interface ArticleTypeSelectProps {
    className?: string;
    value?: ArticleType;
    onChange?: (value: ArticleType) => void;
    readonly?: boolean;
    label?: string;
}

const options = Object.keys(ArticleType).map((key) => ({
    value: ArticleType[key as keyof typeof ArticleType],
    content: ArticleType[key as keyof typeof ArticleType],
}));

export const ArticleTypeSelect = memo((props: ArticleTypeSelectProps) => {
    const { className, value, onChange, readonly, label } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as ArticleType);
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
