import * as yup from 'yup';
import i18n from '@/shared/config/i18n/i18n';

export const loginFormValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required(i18n.t('This field cannot be empty'))
        .email(i18n.t('Please provide a valid email')),
    password: yup.string().required(i18n.t('This field cannot be empty')),
    confirmPassword: yup
        .string()
        .required(i18n.t('This field cannot be empty'))
        .oneOf([yup.ref('password')], i18n.t('Passwords do not match')),
    username: yup.string().required(i18n.t('This field cannot be empty')),
    firstname: yup.string().required(i18n.t('This field cannot be empty')),
    lastname: yup.string().required(i18n.t('This field cannot be empty')),
    age: yup
        .number()
        .typeError(i18n.t('Age must be a number'))
        .integer(i18n.t('Age must be an integer'))
        .min(0.1, i18n.t('Age must be at least 1'))
        .required(i18n.t('This field cannot be empty')),
    city: yup.string().required(i18n.t('This field cannot be empty')),
    avatar: yup.string(),
});
