import React, { memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FormSelect.module.scss';
import { useField } from '@/shared/lib/hooks/useField/useField';
import { VStack } from '../../../Stack';
import { Text } from '../../../Text';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

interface FormSelectProps {
    className?: string;
    SelectComponent: (props: any, ref?: any) => JSX.Element;
    registerName: string;
    defaultValue?: Country | Currency;
    readonly?: boolean;
}

export const FormSelect = memo((props: FormSelectProps) => {
    const { className, SelectComponent, registerName, defaultValue, readonly } =
        props;

    console.log(defaultValue);

    const { error, onChange, value, onBlur } = useField(
        registerName,
        defaultValue,
    );

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange(value);
        },
        [onChange],
    );

    return (
        <VStack className={className} max gap="4">
            <div className={classNames(cls.FormSelect, {}, [className])}>
                <SelectComponent
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    readonly={readonly}
                />
            </div>
            {error && (
                <Text className={cls.text} text={error} variant="error" />
            )}
        </VStack>
    );
});
