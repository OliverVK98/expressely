import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    {
        value: Currency.USD,
        content: Currency.USD,
    },
    {
        value: Currency.EUR,
        content: Currency.EUR,
    },
    {
        value: Currency.MXN,
        content: Currency.MXN,
    },
];

export const CurrencySelect = (props: CurrencySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            label={t('Select currency')}
            items={options}
            className={classNames('', {}, [className])}
            readonly={readonly}
            direction="bottomRight"
        />
    );
};
