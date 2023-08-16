import * as yup from 'yup';

// TODO: i18n for validations

export const profileFormValidationSchema = yup.object().shape({
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
