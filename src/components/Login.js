import React from 'react';
import { useForm } from 'react-hook-form';

function Login({ handleLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  function onSubmit(data) {
    handleLogin(data.email, data.password);
    console.log(data);
  }

  return (
    <form className="login" noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login__title">Вход</h2>
      <input
        className="login__input login__input_email"
        type="email"
        placeholder="Email"
        {...register('email', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
            message: 'Введите корректно email, например "example@ex.com"',
          },
        })}
      ></input>
      <span className="login__input-error">{errors.email && errors.email.message}</span>

      <input
        className="login__input login__input_password"
        type="password"
        placeholder="Пароль"
        {...register('password', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
              'Пароль должен сожержать cтрочные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов',
          },
        })}
      ></input>
      <span className="login__input-error">{errors.password && errors.password.message}</span>

      <button className="login__submit-button" type="submit" disabled={!isValid}>
        Войти
      </button>
    </form>
  );
}

export default Login;
