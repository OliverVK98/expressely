import { ChangeEventHandler, memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    convertMbToBytes,
    generateId,
    getBase64,
} from '../../../../shared/ui/FormFields/model/lib/lib';
import { HStack, VStack } from '../../../../shared/ui/Stack';
import { Button } from '../../../../shared/ui/Button';
import { Text } from '../../../../shared/ui/Text';
import { getProfileImageError } from '../../model/selectors/getProfileSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import cls from './UserAvatarUpload.module.scss';
import { getUserAuthData } from '@/entities/User';

interface UserAvatarUploadProps {
    maxSizeMB: number;
    readonly?: boolean;
    allowedTypes?: string[];
    onUpdateAvatar: (avatar: string | null) => void;
}

export const UserAvatarUpload = memo((props: UserAvatarUploadProps) => {
    const {
        maxSizeMB,
        readonly,
        allowedTypes = ['jpg', 'jpeg', 'png', 'svg'],
        onUpdateAvatar,
    } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const imageError = useSelector(getProfileImageError);
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);

    const onImageChange: ChangeEventHandler<HTMLInputElement> = async (
        event,
    ) => {
        const input = event.target;
        const file = event?.target?.files?.[0];
        if (!file) {
            return;
        }

        const sizeValid = file.size < convertMbToBytes(maxSizeMB);
        const typeValid = allowedTypes.some((type) =>
            file?.type.includes(type),
        );
        const isValid = sizeValid && typeValid;

        if (isValid) {
            dispatch(profileActions.setProfileImageError(''));
            setLoading(true);
            try {
                const base64String = await getBase64(file);
                onUpdateAvatar(base64String);
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

        if (input) {
            input.value = '';
        }
        dispatch(profileActions.setProfileImageError(errorMsg));
    };

    const onImageRemove = () => {
        dispatch(profileActions.setProfileImageError(''));
        onUpdateAvatar(null);
    };

    const htmlFor = useMemo(() => 'change' || generateId(), []);

    return (
        <VStack max>
            <input
                id={htmlFor}
                accept={allowedTypes
                    .map((fileType) => `.${fileType}`)
                    .join(', ')}
                type="file"
                onChange={onImageChange}
                disabled={loading || readonly}
                style={{ display: 'none' }}
            />
            {!readonly && (
                <HStack max gap="8">
                    <Button
                        onClick={() =>
                            document.getElementById(htmlFor)?.click()
                        }
                        disabled={loading || readonly}
                        color="success"
                        className={cls.button}
                    >
                        {t('Upload Avatar')}
                    </Button>
                    {authData?.avatar && (
                        <Button
                            className={cls.button}
                            onClick={onImageRemove}
                            disabled={loading || readonly}
                            color="error"
                        >
                            {t('Remove Avatar')}
                        </Button>
                    )}
                </HStack>
            )}
            {imageError && (
                <Text
                    text={imageError}
                    variant="error"
                    style={{ marginBottom: '-12px' }}
                />
            )}
        </VStack>
    );
});
