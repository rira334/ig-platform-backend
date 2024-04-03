import { signUpSchema, logInSchema } from './auth';
import { eventSchema } from './event';
import * as yup from 'yup';

export const getSchemaObject = (keys: string[], schemaObject: any) => {
  const fields: any = {};
  if (schemaObject.fields) {
    keys.forEach((k) => {
      if (schemaObject.fields[k]) {
        fields[k] = schemaObject.fields[k];
      }
    });
  }

  return yup.object().shape(fields);
};

export {
  signUpSchema,
  logInSchema,
  eventSchema,
}
