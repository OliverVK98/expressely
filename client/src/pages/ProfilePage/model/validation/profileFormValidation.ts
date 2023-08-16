import * as yup from 'yup';
import i18n from '@/shared/config/i18n/i18n';

export const profileFormValidationSchema = yup.object().shape({
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
