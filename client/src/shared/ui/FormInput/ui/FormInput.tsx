import React, { InputHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FormInput.module.scss';
import { Text } from '../../Text';
import { useField } from '@/shared/lib/hooks/useField/useField';
import { VStack } from '../../Stack';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface FormInputProps extends HTMLInputProps {
    className?: string;
    size?: InputSize;
    registerName: string;
}

export const FormInput = memo((props: FormInputProps) => {
    const {
        className,
        type = 'text',
        placeholder,
        size = 'm',
        registerName,
        ...otherProps
    } = props;

    const { error, ...formControlProps } = useField(registerName);

    return (
        <VStack className={className} max gap="4">
            <div
                className={classNames(cls.InputWrapper, {}, [
                    className,
                    cls[size],
                ])}
            >
                <input
                    type={type}
                    className={cls.input}
                    placeholder={placeholder}
                    {...formControlProps}
                    {...otherProps}
                />
            </div>
            {error && (
                <Text className={cls.text} text={error} variant="error" />
            )}
        </VStack>
    );
});
