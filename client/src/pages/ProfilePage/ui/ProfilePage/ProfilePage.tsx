import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
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
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { profileReducer } from '../..';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface ProfilePageProps {
    className?: string;
    isAuthUserProfile: boolean;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

const ProfilePage = ({ className, isAuthUserProfile }: ProfilePageProps) => {
    // TODO: test if id is string "asdasdasd"
    const { id } = useParams<{
        id: string;
    }>();

    // TODO: COME BACK TO THIS CHECK
    // if (isNaN(Number(id))) {
    //     throw new Error();
    // }

    const dispatch = useAppDispatch();
    const authData = useSelector(getProfileData);
    const publicData = useSelector(getProfilePublicData);
    const isLoading = useSelector(getProfileIsLoading);

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

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                data-testid="ProfilePage"
                className={classNames('', {}, [className])}
            >
                <Form<ProfileFormValues>
                    validationSchema={profileFormValidationSchema}
                    onSubmit={onFormSubmitHandler}
                    max
                    // defaultValues={{
                    //     firstname: authData?.firstname,
                    //     lastname: authData?.lastname,
                    //     age: authData?.age,
                    //     city: authData?.city,
                    //     username: authData?.username,
                    //     avatar: authData?.avatar,
                    // }}
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
                        />
                    </VStack>
                </Form>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
