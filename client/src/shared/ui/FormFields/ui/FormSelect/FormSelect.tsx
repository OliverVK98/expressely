import React, { memo } from 'react';
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

    const { error, onChange, value, onBlur } = useField(
        registerName,
        defaultValue,
    );

    return (
        <VStack className={className} max gap="4">
            <div className={className}>
                <SelectComponent
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    readonly={readonly}
                />
            </div>
            {error && <Text text={error} variant="error" />}
        </VStack>
    );
});
