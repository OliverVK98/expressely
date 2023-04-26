import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useSelector } from 'react-redux';
import {
    getProfileData,
    getProfileReadonly,
    profileActions,
    updateProfileData,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData } from 'entities/User';
import cls from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
    className?:string
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === profileData?.id;
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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('User Profile')} />

            {
                canEdit && (
                    <div className={cls.btnsWrapper}>
                        {
                            readonly
                                ? (
                                    <Button
                                        className={cls.editBtn}
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={onEdit}
                                    >
                                        {
                                            t('Edit')
                                        }
                                    </Button>
                                )
                                : (
                                    <>
                                        <Button
                                            className={cls.editBtn}
                                            theme={ButtonTheme.OUTLINE}
                                            onClick={onCancelEdit}
                                        >
                                            {
                                                t('Cancel')
                                            }
                                        </Button>
                                        <Button
                                            theme={ButtonTheme.OUTLINE_RED}
                                            onClick={onSaveEdit}
                                        >
                                            {
                                                t('Save')
                                            }
                                        </Button>
                                    </>
                                )
                        }
                    </div>
                )
            }
        </div>
    );
};
