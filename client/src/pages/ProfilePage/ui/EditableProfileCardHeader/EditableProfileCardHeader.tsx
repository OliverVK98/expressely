import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '../../model/slice/profileSlice';
import { Card } from '@/shared/ui/Card';
import { Profile } from '@/entities/Profile';
import { ProfileFormValues } from '../../model/types/profileFormValues';

interface EditableProfileCardHeaderProps {
    className?: string;
    isAuthUserProfile: boolean;
    authData?: Profile;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className, isAuthUserProfile, authData } = props;
        const { t } = useTranslation();
        const readonly = useSelector(getProfileReadonly);
        const { reset } = useFormContext<ProfileFormValues>();

        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadOnly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
            reset({
                firstname: authData?.firstname,
                lastname: authData?.lastname,
                age: authData?.age,
                city: authData?.city,
                username: authData?.username,
                avatar: authData?.avatar,
                currency: authData?.currency,
                country: authData?.country,
            });
        }, [authData, dispatch, reset]);

        return (
            <Card border="default" padding="16" max>
                <HStack
                    max
                    justify="between"
                    className={classNames('', {}, [className])}
                >
                    <Text
                        title={t(
                            isAuthUserProfile ? 'Your Profile' : 'User Profile',
                        )}
                    />

                    {isAuthUserProfile && (
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
                                        data-testid="EditableProfileCardHeader.SaveButton"
                                        color="success"
                                        type="submit"
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
