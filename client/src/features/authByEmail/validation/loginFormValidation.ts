import * as yup from 'yup';

// TODO: i18n for validations

export const loginFormValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('This field cannot be empty')
        .email('Please provide a valid email'),
    password: yup
        .string()
        .required(`This field cannot be empty`)
        .min(3, 'Password should be at least 3 characters'),
});
