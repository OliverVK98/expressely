import React, { CSSProperties, InputHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FormInput.module.scss';
import { Text } from '../../../Text';
import { useField } from '@/shared/lib/hooks/useField/useField';
import { HStack, VStack } from '../../../Stack';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size' | 'placeholder'
>;

type InputSize = 's' | 'm' | 'l';

interface FormInputProps extends HTMLInputProps {
    className?: string;
    size?: InputSize;
    registerName: string;
    errorMargin: number;
    req?: boolean;
    readonly?: boolean;
    label?: string;
    placeholder: string;
}

export const FormInput = memo((props: FormInputProps) => {
    const {
        className,
        type = 'text',
        placeholder,
        size = 'm',
        registerName,
        errorMargin,
        req,
        readonly,
        label,
        ...otherProps
    } = props;

    const { error, ...formControlProps } = useField(registerName);

    const errorMargins: CSSProperties = {
        marginBottom: `-${errorMargin}px`,
    };

    const input = (
        <div className={classNames(cls.InputWrapper, {}, [cls[size]])}>
            <input
                type={type}
                className={cls.input}
                readOnly={readonly}
                placeholder={placeholder + (req ? ' (required)' : '')}
                {...formControlProps}
                {...otherProps}
            />
        </div>
    );

    if (label) {
        return (
            <VStack max>
                <HStack max gap="8">
                    <Text text={label} className={cls.label} />
                    {input}
                </HStack>
                {error && (
                    <Text
                        style={errorMargins}
                        className={cls.textWithLabel}
                        text={error}
                        variant="error"
                    />
                )}
            </VStack>
        );
    }

    return (
        <VStack className={className} max gap="4">
            {input}
            {error && (
                <Text
                    style={errorMargins}
                    className={cls.text}
                    text={error}
                    variant="error"
                />
            )}
        </VStack>
    );
});
