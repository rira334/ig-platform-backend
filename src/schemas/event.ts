import * as yup from 'yup';

export const eventSchema = yup.object().shape({
  tags: yup.array().required().min(1),
  locationFormatted: yup.string().required(),
  country: yup.string().required(),
  location: yup.object().required(),
  images: yup.array().required().min(1),
  description: yup.string().required().min(10),
  startHour: yup.string().required(),
  date: yup.string().required(),
  title: yup.string().required().min(5),
});