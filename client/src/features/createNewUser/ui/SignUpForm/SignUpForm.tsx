import { useTranslation } from 'react-i18next';
import React, { memo, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './SignUpForm.module.scss';
import { useCreateUser } from '../../api/signUpForm';
import { Text } from '@/shared/ui/Text';
import { Form } from '@/shared/ui/Form';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { FormValues } from '../../types/signUpFormValues';
import { loginFormValidationSchema } from '../../validation/signUpFormValidation';
import { Country, CountrySelect } from '@/entities/Country';
import { FormInput, FormSelect } from '@/shared/ui/FormFields';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { userActions } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { RTKApiError } from '@/shared/api/rtkApi';

interface SignUpFormProps {
    className?: string;
    onSuccess: () => void;
}

const SignUpForm = memo((props: SignUpFormProps) => {
    const { className, onSuccess } = props;
    const { t } = useTranslation();
    const [createUser, { error, data, isLoading }] = useCreateUser();
    const dispatch = useAppDispatch();

    const onSubmit = ({
        email,
        username,
        password,
        age,
        lastname,
        firstname,
        avatar,
        currency,
        country,
        city,
    }: FormValues) => {
        createUser({
            age,
            avatar,
            firstname,
            lastname,
            username,
            city,
            country,
            currency,
            email,
            password,
        });
    };

    useEffect(() => {
        if (data) {
            localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, data.accessToken);
            dispatch(userActions.setAuthData(data));
            onSuccess();
        }
    }, [data, dispatch, onSuccess]);

    return (
        <VStack
            gap="24"
            className={classNames(cls.SignUpForm, {}, [className])}
        >
            <Text align="center" title={t('Create Account')} />
            {error && (
                <Text
                    text={(error as RTKApiError).data.message}
                    variant="error"
                    className={cls.error}
                />
            )}
            <Form<FormValues>
                max
                gap="24"
                validationSchema={loginFormValidationSchema}
                onSubmit={onSubmit}
            >
                <FormInput
                    className={cls.input}
                    placeholder={t('Email')}
                    type="text"
                    registerName="email"
                    errorMargin={20}
                    req
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('Username')}
                    type="text"
                    registerName="username"
                    errorMargin={20}
                    req
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('Password')}
                    type="password"
                    registerName="password"
                    errorMargin={20}
                    req
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('Confirm Password')}
                    type="password"
                    registerName="confirmPassword"
                    errorMargin={20}
                    req
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('First Name')}
                    type="text"
                    registerName="firstname"
                    errorMargin={20}
                    req
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('Last Name')}
                    type="text"
                    registerName="lastname"
                    errorMargin={20}
                    req
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('Avatar (URL)')}
                    type="text"
                    registerName="avatar"
                    errorMargin={20}
                />

                <FormInput
                    className={cls.input}
                    placeholder={t('Age')}
                    type="text"
                    registerName="age"
                    errorMargin={20}
                    req
                />
                <FormSelect
                    SelectComponent={CountrySelect}
                    registerName="country"
                    defaultValue={Country.USA}
                />
                <FormSelect
                    SelectComponent={CurrencySelect}
                    registerName="currency"
                    defaultValue={Currency.USD}
                />
                <FormInput
                    className={cls.input}
                    placeholder={t('City')}
                    type="text"
                    registerName="city"
                    errorMargin={20}
                    req
                />
                <Button
                    className={cls.signUpBtn}
                    disabled={isLoading}
                    type="submit"
                    color="success"
                >
                    {t('Create Account')}
                </Button>
            </Form>
        </VStack>
    );
});

export default SignUpForm;
