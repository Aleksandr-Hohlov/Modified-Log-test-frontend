import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function Register({ handleRegister, isDataSet }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  function onSubmit(data) {
    handleRegister(data.name, data.email, data.password);
    console.log(data);
  }

  return (
    <form className="login" noValidate onSubmit={handleSubmit(onSubmit)}>
      <h2 className="login__title">Регистрация</h2>
      <input
        className="login__input login__input_name"
        type="name"
        placeholder="Имя"
        // id="name"
        // name="name"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
          minLength: {
            value: 3,
            message: 'Имя должно содержать минимум 3 символа',
          },
          pattern: {
            value: /^[A-Za-zА-Яа-я0-9_ \t]{2,35}$/,
            message: 'Только буквы и цифры, не более 35 символов',
          },
          //onChange: (e) => setErrName(e.target.validationMessage),
        })}
      ></input>
      <span className="login__input-error">{errors.name && errors.name.message}</span>

      <input
        className="login__input login__input_email"
        type="email"
        placeholder="Email"
        // id="email"
        // name="email"
        {...register('email', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
            message: 'Введите корректно email, например "example@ex.com"',
          },
          // onChange: (e) => setErrEmail(e.target.validationMessage),
        })}
      ></input>
      <span className="login__input-error">{errors.email && errors.email.message}</span>

      <input
        className="login__input login__input_password"
        type="password"
        placeholder="Пароль"
        // id="password"
        // name="password"
        {...register('password', {
          required: 'Поле обязательно для заполнения',
          pattern: {
            value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
            message:
              'Придумайте пароль. Должен сожержать cтрочные и прописные латинские буквы, цифры, спецсимволы. Минимум 8 символов',
          },
        })}
      ></input>
      <span className="login__input-error">{errors.password && errors.password.message}</span>

      <button className="login__submit-button" type="submit" disabled={!isValid}>
        Зарегистрироваться
      </button>
      <Link to="/sign-in" className="login__link-enter">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

export default Register;
