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
    onSubmit(values: TValues, isDirty: boolean): void;
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
    const formProviderProps = useForm<any>({
        defaultValues: defaultValues as any,
        ...(validationSchema && {
            resolver: yupResolver(validationSchema),
        }),
        mode: 'onBlur',
    });

    const mods: Mods = {
        [cls.max]: max,
    };

    return (
        <FormProvider {...formProviderProps}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formProviderProps.handleSubmit((data) => {
                        onSubmit(data, formProviderProps.formState.isDirty);
                    })(e);
                }}
                className={classNames(cls.Form, mods, [className])}
            >
                <VStack gap={gap}>{children}</VStack>
            </form>
        </FormProvider>
    );
};
