import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { getLoginEmail } from '../../model/selectors/getLoginUsername/getLoginEmail';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import cls from './LoginForm.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Form } from '@/shared/ui/Form';
import { FormValues, getLoginFormValidation } from './getLoginFormValidation';
import { FormInput } from '@/shared/ui/FormInput';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const isLoading = useSelector(getLoginIsLoading);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const { defaultValues, validationSchema } = getLoginFormValidation();

    const onSubmit = useCallback(
        async (data: FormValues) => {
            const result = await dispatch(
                loginByUsername({
                    ...data,
                }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onSuccess();
            }
        },
        [onSuccess, dispatch],
    );

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(
            loginByUsername({
                email,
                password,
            }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [onSuccess, dispatch, password, email]);

    return (
        <DynamicModuleLoader removerAfterUnmount reducers={initialReducers}>
            <VStack
                gap="16"
                className={classNames(cls.LoginForm, {}, [className])}
            >
                <Text title={t('Sign In Form')} />
                {/* TODO: uncomment and fix */}
                {/* {error && ( */}
                {/*     <Text */}
                {/*         text={i18n.t('Incorrect login or password')} */}
                {/*         variant="error" */}
                {/*     /> */}
                {/* )} */}
                <Form<FormValues>
                    validationSchema={validationSchema}
                    max
                    gap="8"
                    onSubmit={onSubmit}
                >
                    <FormInput
                        className={cls.input}
                        placeholder={t('Email')}
                        type="text"
                        registerName="email"
                    />
                    <FormInput
                        className={cls.input}
                        type="text"
                        placeholder={t('Password')}
                        registerName="password"
                    />
                    <Button
                        className={cls.loginBtn}
                        // onClick={onLoginClick}
                        disabled={isLoading}
                        type="submit"
                    >
                        {t('Sign In')}
                    </Button>
                </Form>
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
