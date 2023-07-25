import { useController, useFormContext } from 'react-hook-form';

export function useField(name: string, defaultValue?: string) {
    const { control } = useFormContext();

    const {
        field: { onChange, onBlur, value = '', ref },
        formState: { errors, touchedFields },
    } = useController({
        name,
        control,
        defaultValue,
    });

    return {
        onBlur,
        onChange,
        value,
        error: touchedFields[name] ? (errors?.[name]?.message as string) : null,
        ref,
    };
}
