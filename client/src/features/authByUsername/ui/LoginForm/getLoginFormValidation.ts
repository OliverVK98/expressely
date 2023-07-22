import * as yup from 'yup';

export const getLoginFormValidation = () => {
    const validationSchema = yup.object().shape({
        email: yup.string().required().email(),
        password: yup.string().required(),
    });

    return {
        validationSchema,
        defaultValues: {
            email: '',
            password: '',
        },
    };
};

export const valSchema = yup
    .object({
        firstName: yup.string().required(),
        age: yup.number().positive().integer().required(),
    })
    .required();

export interface FormValues {
    email: string;
    password: string;
}
