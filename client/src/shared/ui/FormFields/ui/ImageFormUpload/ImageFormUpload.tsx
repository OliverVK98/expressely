import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { useField } from '@/shared/lib/hooks/useField/useField';
import { convertMbToBytes, generateId, getBase64 } from '../../model/lib/lib';
import { Text } from '../../../Text';
import { VStack } from '../../../Stack';
import { Button } from '../../../Button';

interface ImageFormUploadProps {
    maxSizeMB: number;
    registerName: string;
    readonly?: boolean;
}

const allowedTypes = ['jpg', 'jpeg', 'png', 'svg'];

export const ImageFormUpload = memo((props: ImageFormUploadProps) => {
    const { maxSizeMB, registerName, readonly } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const { setError } = useFormContext();

    const {
        onChange,
        error: validationError,
        ref,
        onBlur,
    } = useField(registerName);

    const onImageChange: React.ChangeEventHandler<HTMLInputElement> = async (
        event,
    ) => {
        const file = event?.target?.files?.[0];
        if (!file) {
            return;
        }

        const sizeValid = file.size < convertMbToBytes(maxSizeMB);
        const typeValid = allowedTypes.some((type) => file.type.includes(type));
        const isValid = sizeValid && typeValid;

        if (isValid) {
            setError('customImageError', { type: 'custom', message: '' });

            setLoading(true);
            try {
                const base64String = await getBase64(file);
                onChange(base64String);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }
            return;
        }

        const errorMsg = typeValid
            ? `Image size is too large. Max image size is ${maxSizeMB}MB`
            : `Image format is wrong. Allowed file formats: ${allowedTypes.join(
                  ', ',
              )}.`;

        setError('customImageError', { type: 'custom', message: errorMsg });
    };

    const htmlFor = useMemo(() => registerName || generateId(), [registerName]);

    return (
        <VStack>
            <input
                id={htmlFor}
                accept={allowedTypes
                    .map((fileType) => `.${fileType}`)
                    .join(', ')}
                type="file"
                onChange={onImageChange}
                ref={ref}
                onBlur={onBlur}
                disabled={loading || readonly}
                style={{ display: 'none' }}
            />
            <Button
                onClick={() => document.getElementById(htmlFor)?.click()}
                disabled={loading || readonly}
            >
                {t('Upload Avatar')}
            </Button>
            {validationError && <Text text={validationError} variant="error" />}
        </VStack>
    );
});
