import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '../store';
import { addUser, User } from '../store/usersSlice';
import userSchema from '../validations/user';
import CountryAutocomplete from './CountryAutocomplete';
import CustomLink from './ui/CustomLink';
import styles from './Form.module.css';

interface IFormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'M' | 'F';
  terms: boolean;
  picture: File | 0 | null;
  country: string;
}

const ReactHookForm = () => {
  const countries = useSelector((state: RootState) => state.coutries.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IFormInput>({ mode: 'all', resolver: zodResolver(userSchema) });

  const onSubmit = (data: IFormInput) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, picture, ...userData } = data;
    const reader = new FileReader();
    const user: User = { ...userData };

    if (picture) reader.readAsDataURL(picture);
    reader.onloadend = function () {
      user.picture = reader.result?.toString();
      dispatch(addUser(user));
    };

    navigate('/');
  };

  return (
    <>
      <h1>React Hook Form</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        autoComplete="on"
      >
        <label>
          Name:
          <input type="text" {...register('name')} />
        </label>
        {errors.name && (
          <span className={styles.errorMessage}>{errors.name.message}</span>
        )}
        <label>
          Age:
          <input type="number" {...register('age')} />
        </label>
        {errors.age && (
          <span className={styles.errorMessage}>{errors.age.message}</span>
        )}
        <label>
          Email:
          <input type="email" {...register('email')} />
        </label>
        {errors.email && (
          <span className={styles.errorMessage}>{errors.email.message}</span>
        )}
        <label>
          Password:
          <input type="password" {...register('password')} />
        </label>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
        <label>
          Confirm password:
          <input type="password" {...register('confirmPassword')} />
        </label>
        {errors.confirmPassword && (
          <span className={styles.errorMessage}>
            {errors.confirmPassword.message}
          </span>
        )}

        <p>
          Gender:
          <label>
            <input
              type="radio"
              value="M"
              defaultChecked
              {...register('gender')}
            />
            M
          </label>
          <label>
            <input type="radio" value="F" {...register('gender')} />F
          </label>
        </p>

        <label>
          Picture:
          <input type="file" {...register('picture')} />
        </label>
        {errors.picture && (
          <span className={styles.errorMessage}>{errors.picture.message}</span>
        )}

        <label>
          Country:
          <CountryAutocomplete countries={countries} {...register('country')} />
        </label>
        {errors.country && (
          <span className={styles.errorMessage}>{errors.country.message}</span>
        )}

        <label>
          <input type="checkbox" {...register('terms')} />
          Accept Terms and Conditions agreement
        </label>
        {errors.terms && (
          <span className={styles.errorMessage}>{errors.terms.message}</span>
        )}

        <input type="submit" value="Submit" disabled={!isDirty || !isValid} />
      </form>

      <CustomLink to={'/'}>Go Home</CustomLink>
    </>
  );
};

export default ReactHookForm;
