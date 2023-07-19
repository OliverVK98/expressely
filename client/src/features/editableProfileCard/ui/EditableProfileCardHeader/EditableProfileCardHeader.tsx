import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Card } from '@/shared/ui/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.userId;
        const readonly = useSelector(getProfileReadonly);

        const dispatch = useAppDispatch();
        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadOnly(false));
        }, [dispatch]);
        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);
        const onSaveEdit = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <Card border="default" padding="16" max>
                <HStack
                    max
                    justify="between"
                    className={classNames('', {}, [className])}
                >
                    <Text title={t('User Profile')} />

                    {canEdit && (
                        <div>
                            {readonly ? (
                                <Button
                                    onClick={onEdit}
                                    data-testid="EditableProfileCardHeader.EditButton"
                                >
                                    {t('Edit')}
                                </Button>
                            ) : (
                                <HStack gap="8">
                                    <Button
                                        onClick={onCancelEdit}
                                        data-testid="EditableProfileCardHeader.CancelButton"
                                        color="error"
                                    >
                                        {t('Cancel')}
                                    </Button>
                                    <Button
                                        onClick={onSaveEdit}
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                        color="success"
                                    >
                                        {t('Save')}
                                    </Button>
                                </HStack>
                            )}
                        </div>
                    )}
                </HStack>
            </Card>
        );
    },
);
