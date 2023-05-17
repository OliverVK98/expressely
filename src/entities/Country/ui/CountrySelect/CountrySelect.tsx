import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    {
        value: Country.USA,
        content: Country.USA,
    },
    {
        value: Country.Mexico,
        content: Country.Mexico,
    },
    {
        value: Country.Russia,
        content: Country.Russia,
    },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            label={t('Select country')}
            items={options}
            className={classNames('', {}, [className])}
            readonly={readonly}
            direction="topRight"
        />
    );

    // return (
    //     <Select
    //         className={classNames('', { }, [className])}
    //         label={t('Select country')}
    //         onChange={onChangeHandler}
    //         options={options}
    //         value={value}
    //         readonly={readonly}
    //     />
    // );
});
