import { z } from 'zod';
import { initialState } from '../store/countriesSlice';

const MAX_FILE_SIZE = 5242880;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const passwordSchema = z.coerce
  .string()
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must include 1 number',
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must include 1 uppercased letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must include 1 lowercased letter',
  })
  .refine((password) => /[~`!@#$/%\\^_&*()-+={[}]|:;"'<,>.?]/.test(password), {
    message: 'Password must include 1 special character',
  });

const userSchema = z
  .object({
    name: z.coerce
      .string()
      .trim()
      .refine((name) => name.length && name[0] === name[0].toUpperCase(), {
        message: 'Name must start with uppercased letter',
      }),
    age: z.coerce.number().positive(),
    email: z.coerce.string().trim().email(),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    gender: z.enum(['M', 'F']),
    terms: z.coerce.boolean().refine((val) => val, {
      message: 'Please accept T&C aggrement',
    }),
    picture: z
      .custom<FileList>()
      .transform((files) => files.length && files.item(0))
      .refine(
        (file) => file && file.size <= MAX_FILE_SIZE,
        `Max image size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`
      )
      .refine(
        (file) => file && ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg and .png formats are supported.'
      ),
    country: z.coerce
      .string()
      .trim()
      .refine((val) => initialState.countries.includes(val), {
        message: 'This must be a country',
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
export default userSchema;
