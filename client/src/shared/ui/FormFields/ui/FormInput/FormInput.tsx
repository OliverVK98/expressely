import React, { CSSProperties, InputHTMLAttributes, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './FormInput.module.scss';
import { Text } from '../../../Text';
import { useField } from '@/shared/lib/hooks/useField/useField';
import { VStack } from '../../../Stack';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'
>;

type InputSize = 's' | 'm' | 'l';

interface FormInputProps extends HTMLInputProps {
    className?: string;
    size?: InputSize;
    registerName: string;
    errorMargin: number;
    req?: boolean;
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
        ...otherProps
    } = props;

    const { error, ...formControlProps } = useField(registerName);

    const errorMargins: CSSProperties = {
        marginBottom: `-${errorMargin}px`,
    };

    return (
        <VStack className={className} max gap="4">
            <div className={classNames(cls.InputWrapper, {}, [cls[size]])}>
                <input
                    type={type}
                    className={cls.input}
                    placeholder={placeholder + (req ? ' (required)' : '')}
                    {...formControlProps}
                    {...otherProps}
                />
            </div>
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
