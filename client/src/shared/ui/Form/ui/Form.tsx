import { ReactNode } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { AnyObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Form.module.scss';
import { VStack } from '../../Stack';
import { FlexGap } from '../../Stack/ui/Flex/Flex';

interface FormProps<TValues extends FieldValues> {
    className?: string;
    children: ReactNode;
    defaultValues?: Record<string, any>;
    max?: boolean;
    gap?: FlexGap;
    validationSchema: AnyObjectSchema;
    onSubmit(values: TValues): void;
}

export const Form = <TValues extends FieldValues = FieldValues>(
    props: FormProps<TValues>,
) => {
    const {
        className,
        children,
        max,
        gap = '4',
        validationSchema,
        onSubmit,
        defaultValues,
    } = props;
    const formProviderProps = useForm<TValues>({
        defaultValues: defaultValues as any,
        ...(validationSchema && {
            resolver: yupResolver(validationSchema),
        }),
        mode: 'onBlur',
    });

    console.log(formProviderProps.formState.errors);

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <FormProvider {...formProviderProps}>
            <form
                onSubmit={formProviderProps.handleSubmit(onSubmit)}
                className={classNames(cls.Form, mods, [className])}
            >
                <VStack gap={gap}>{children}</VStack>
            </form>
        </FormProvider>
    );
};
