import { useController, useFormContext } from 'react-hook-form';

export function useField(name: string) {
    const { control } = useFormContext();

    const {
        field: { onChange, onBlur, value, ref },
        formState: { errors, touchedFields },
    } = useController({
        name,
        control,
    });

    return {
        onBlur,
        onChange,
        value,
        error: touchedFields[name] ? (errors?.[name]?.message as string) : null,
        ref,
    };
}
