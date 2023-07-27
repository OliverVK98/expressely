import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import i18n from 'i18next';
import { FormInput } from '@/shared/ui/FormFields';
import { Button } from '@/shared/ui/Button';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './LoginForm.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Form } from '@/shared/ui/Form';
import { loginFormValidationSchema } from '../../validation/loginFormValidation';
import { useGetLoginUser } from '../../api/loginForm';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { userActions } from '@/entities/User';
import { FormValues } from '../../types/loginFormValues';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [loginUser, { isLoading, error, data }] = useGetLoginUser();

    const onSubmit = (authData: FormValues) => {
        loginUser(authData);
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.accessToken);
            dispatch(userActions.setAuthData(data));
            onSuccess();
        }
    }, [data, dispatch, onSuccess]);

    return (
        <VStack gap="32" className={classNames(cls.LoginForm, {}, [className])}>
            <Text text={t('Log In')} bold size="l" />

            <Form<FormValues>
                validationSchema={loginFormValidationSchema}
                max
                gap="32"
                onSubmit={onSubmit}
            >
                {error && (
                    <Text
                        className={cls.error}
                        text={i18n.t('Invalid credentials')}
                        variant="error"
                    />
                )}
                <FormInput
                    className={cls.input}
                    placeholder={t('Email')}
                    type="text"
                    registerName="email"
                    errorMargin={24}
                />
                <FormInput
                    className={cls.input}
                    type="text"
                    placeholder={t('Password')}
                    registerName="password"
                    errorMargin={24}
                />

                <Button
                    className={cls.loginBtn}
                    disabled={isLoading}
                    type="submit"
                    variant="outline"
                    color="success"
                >
                    {t('Log In')}
                </Button>
            </Form>
        </VStack>
    );
});

export default LoginForm;
