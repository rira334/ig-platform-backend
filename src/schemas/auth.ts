import * as yup from 'yup';

const logInObjects = {
  password: yup.string().required().min(4),
  email: yup.string().required().min(4),
};

const signUpObjects = {
  password: yup.string().required().min(4),
  email: yup.string().required().min(4),
};

export const logInSchema = yup.object().shape({
  ...logInObjects,
});

export const signUpSchema = yup.object().shape({
  ...signUpObjects,
});
