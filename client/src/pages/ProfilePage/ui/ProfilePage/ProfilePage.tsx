import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { Form } from '@/shared/ui/Form';
import { ProfileFormValues } from '../../model/types/profileFormValues';
import { profileFormValidationSchema } from '../../model/validation/profileFormValidation';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { EditableProfileCard } from '../EditableProfileCard/EditableProfileCard';
import { getProfileData } from '../../model/selectors/getProfileAuthData/getProfileData';
import { getProfilePublicData } from '../../model/selectors/getProfilePublicData/getProfilePublicData';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchAuthProfileData } from '../../model/services/fetchAuthProfileData/fetchAuthProfileData';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer, profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { ArticlesRecommendationsListContainer } from '@/features/articlesRecommendationsList';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
    isAuthUserProfile: boolean;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = ({ className, isAuthUserProfile }: ProfilePageProps) => {
    const { id } = useParams<{
        id: string;
    }>();

    const dispatch = useAppDispatch();
    const authData = useSelector(getProfileData);
    const publicData = useSelector(getProfilePublicData);

    useInitialEffect(() => {
        if (isAuthUserProfile) {
            dispatch(fetchAuthProfileData());
        } else {
            dispatch(fetchProfileData(+id!));
        }
    });

    const onFormSubmitHandler = useCallback(
        (data: ProfileFormValues) => {
            dispatch(profileActions.cancelEdit());
            dispatch(updateProfileData(data));
        },
        [dispatch],
    );

    const content = (
        <Page
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            <Form<ProfileFormValues>
                validationSchema={profileFormValidationSchema}
                onSubmit={onFormSubmitHandler}
                max
            >
                <VStack max gap="16">
                    <EditableProfileCardHeader
                        authData={authData}
                        isAuthUserProfile={isAuthUserProfile}
                    />
                    <EditableProfileCard
                        isAuthUserProfile={isAuthUserProfile}
                        publicData={publicData}
                        authData={authData}
                        id={+id!}
                    />
                </VStack>
            </Form>
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <StickyContentLayout
                content={content}
                right={
                    <ArticlesRecommendationsListContainer
                        className={cls.rightbar}
                    />
                }
            />
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
