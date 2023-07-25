import * as yup from 'yup';

// TODO: i18n for validations

export const loginFormValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('This field cannot be empty')
        .email('Please provide a valid email'),
    password: yup.string().required('This field cannot be empty'),
    confirmPassword: yup
        .string()
        .required('This field cannot be empty')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
    username: yup.string().required('This field cannot be empty'),
    firstname: yup.string().required('This field cannot be empty'),
    lastname: yup.string().required('This field cannot be empty'),
    age: yup
        .number()
        .typeError('Age must be a number')
        .integer('Age must be an integer')
        .min(0.1, 'Age must be at least 1')
        .required('This field cannot be empty'),
    city: yup.string().required('This field cannot be empty'),
    avatar: yup.string(),
});
