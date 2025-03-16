import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ZodIssue } from 'zod';
import { RootState } from '../store';
import { addUser, User } from '../store/usersSlice';
import CountryAutocomplete from './CountryAutocomplete';
import userSchema from '../validations/user';
import CustomLink from './ui/CustomLink';
import styles from './Form.module.css';

const FormUncontrolled = () => {
  const countries = useSelector((state: RootState) => state.coutries.countries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const genderM = useRef<HTMLInputElement>(null);
  const genderF = useRef<HTMLInputElement>(null);
  const terms = useRef<HTMLInputElement>(null);
  const picture = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ZodIssue[] | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name: name.current?.value,
      age: age.current?.value,
      email: email.current?.value,
      password: password.current?.value,
      confirmPassword: confirmPassword.current?.value,
      gender: genderM.current?.checked
        ? genderM.current?.value
        : genderF.current?.value,
      terms: terms.current?.checked,
      picture: picture.current?.files,
      country: country.current?.value,
    };
    const formValidation = userSchema.safeParse(formData);

    if (formValidation.success) {
      setErrors([]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { terms, picture, ...userData } = formValidation.data;
      const reader = new FileReader();
      const user: User = { ...userData };

      if (picture) reader.readAsDataURL(picture);
      reader.onloadend = function () {
        user.picture = reader.result?.toString();
        dispatch(addUser(user));
      };

      navigate('/');
    } else {
      setErrors(formValidation.error.issues);
    }
  };

  const showErrors = (field: string) => {
    return errors?.map((error, index) => {
      if (error.path.includes(field)) {
        return (
          <span className={styles.errorMessage} key={index}>
            {error.message}
          </span>
        );
      }
    });
  };

  return (
    <>
      <h1>Form (uncontrolled components)</h1>

      <form onSubmit={handleSubmit} className={styles.form} autoComplete="on">
        <label>
          Name:
          <input type="text" ref={name} />
        </label>
        {showErrors('name')}
        <label>
          Age:
          <input type="number" ref={age} />
        </label>
        {showErrors('age')}
        <label>
          Email:
          <input type="email" ref={email} />
        </label>
        {showErrors('email')}
        <label>
          Password:
          <input type="password" ref={password} />
        </label>
        {showErrors('password')}
        <label>
          Confirm password:
          <input type="password" ref={confirmPassword} />
        </label>
        {showErrors('confirmPassword')}

        <p>
          Gender:
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              ref={genderM}
              defaultChecked
            />
            M
          </label>
          <label>
            <input type="radio" name="gender" value="F" ref={genderF} />F
          </label>
        </p>

        <label>
          Picture:
          <input type="file" ref={picture} />
        </label>
        {showErrors('picture')}

        <label>
          Country:
          <CountryAutocomplete countries={countries} ref={country} />
        </label>
        {showErrors('country')}

        <label>
          <input type="checkbox" ref={terms} />
          Accept Terms and Conditions agreement
        </label>
        {showErrors('terms')}

        <input type="submit" value="Submit" />
      </form>

      <CustomLink to={'/'}>Go Home</CustomLink>
    </>
  );
};

export default FormUncontrolled;
