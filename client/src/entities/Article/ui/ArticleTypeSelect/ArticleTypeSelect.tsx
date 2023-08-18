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
    showRemoveOption?: boolean;
    onRemove?: () => void;
}

const options = Object.keys(UserArticleType).map((key) => ({
    value: UserArticleType[key as keyof typeof UserArticleType],
    content: UserArticleType[key as keyof typeof UserArticleType],
}));
const removeOption = { value: 'REMOVE', content: 'Remove' };
const optionsWithRemove = [...options, removeOption];

export const ArticleTypeSelect = memo((props: ArticleTypeSelectProps) => {
    const {
        className,
        value,
        onChange,
        readonly,
        label,
        showRemoveOption,
        onRemove,
    } = props;

    const onChangeHandler = useCallback(
        (selectedValue: string) => {
            if (selectedValue === 'REMOVE') {
                onRemove?.();
            } else {
                onChange?.(selectedValue as UserArticleType);
            }
        },
        [onChange, onRemove],
    );

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            label={label}
            items={showRemoveOption ? optionsWithRemove : options}
            className={classNames('', {}, [className])}
            readonly={readonly}
            direction="bottomRight"
        />
    );
});
