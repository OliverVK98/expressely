import * as yup from 'yup';
import i18n from '@/shared/config/i18n/i18n';

export const loginFormValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required(i18n.t('This field cannot be empty'))
        .email(i18n.t('Please provide a valid email')),
    password: yup
        .string()
        .required(i18n.t(`This field cannot be empty`))
        .min(3, i18n.t('Password should be at least 3 characters')),
});
