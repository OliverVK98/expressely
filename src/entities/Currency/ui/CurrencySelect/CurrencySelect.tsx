import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';
import { memo, useCallback } from 'react';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?:string,
    value?: Currency,
    onChange?: (value: Currency) => void,
    readonly?: boolean
}

const options = [
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.RUB, content: Currency.RUB },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className, value, onChange, readonly,
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Select
            className={classNames('', { }, [className])}
            label={t('Select currency')}
            onChange={onChangeHandler}
            options={options}
            value={value}
            readonly={readonly}
        />
    );
});
