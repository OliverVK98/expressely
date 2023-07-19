import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';
import { fetchAuthProfileData } from '../../model/services/fetchAuthProfileData/fetchAuthProfileData';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { ProfileCard } from '@/entities/Profile';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { ValidateProfileError } from '../../model/consts/consts';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import cls from './EditableProfileCard.module.scss';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { getProfilePublicData } from '../../model/selectors/getProfilePublicData/getProfilePublicData';

interface EditableProfileCardProps {
    className?: string;
    id: number;
    isAuthUserProfile: boolean;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id, isAuthUserProfile } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const error = useSelector(getProfileError);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const publicData = useSelector(getProfilePublicData);
    console.log(formData);

    useInitialEffect(() => {
        if (isAuthUserProfile) {
            dispatch(fetchAuthProfileData());
        } else {
            dispatch(fetchProfileData(id));
        }
    });

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t('Server error'),
        [ValidateProfileError.NO_DATA]: t('Data is missing'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('Incorrect Country'),
        [ValidateProfileError.INCORRECT_AGE]: t('Incorrect age'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            'Incorrect First Name or Last Name',
        ),
    };

    const onChangeFirstName = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.updateProfile({
                    firstname: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeLastName = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.updateProfile({
                    lastname: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.updateProfile({
                    city: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.updateProfile({
                    age: Number(value || 0),
                }),
            );
        },
        [dispatch],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.updateProfile({
                    username: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(
                profileActions.updateProfile({
                    avatar: value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeCurrency = useCallback(
        (currency?: Currency) => {
            dispatch(
                profileActions.updateProfile({
                    currency,
                }),
            );
        },
        [dispatch],
    );

    const onChangeCountry = useCallback(
        (country?: Country) => {
            dispatch(
                profileActions.updateProfile({
                    country: country || Country.USA,
                }),
            );
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="8"
                max
                className={classNames(cls.EditableProfileCard, {}, [className])}
            >
                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <Text
                            key={err}
                            variant="error"
                            text={validateErrorTranslates[err]}
                            data-testid="EditableProfileCard.Error"
                        />
                    ))}
                <ProfileCard
                    data={isAuthUserProfile ? formData : publicData}
                    isLoading={isLoading}
                    isAuthUserProfile={isAuthUserProfile}
                    error={error}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                    readonly={readonly}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeAvatar={onChangeAvatar}
                    onChangeUsername={onChangeUsername}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});
