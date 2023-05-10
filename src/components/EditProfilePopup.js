import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [data, setData] = React.useState({
    name: '',
    age: '',
    city: '',
    education: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  React.useEffect(() => {
    setData({
      name: currentUser.name,
      age: currentUser.age,
      city: currentUser.city,
      education: currentUser.education,
    });
    // setName(currentUser.name);
    // setAge(currentUser.age);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    const { name, age, city, education } = data;

    onUpdateUser({
      name,
      age,
      city,
      education,
    });
  }

  return (
    <PopupWithForm
      name="popup__form_submit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="text"
        placeholder="Введите имя"
        className="popup__input popup__input_type_name"
        name="name"
        value={data.name}
        onChange={handleChange}
        required
        minLength="3"
        maxLength="30"
      />

      <input
        type="number"
        placeholder="Возвраст"
        className="popup__input popup__input_type_age"
        name="age"
        value={data.age}
        onChange={handleChange}
        required
        min="10"
        max="99"
      />

      <input
        type="text"
        placeholder="Город проживания"
        className="popup__input popup__input_type_education"
        name="city"
        value={data.city}
        onChange={handleChange}
        required
        minLength="3"
        maxLength="30"
      />

      <input
        type="text"
        placeholder="ВУЗ в котором учились"
        className="popup__input popup__input_type_education"
        name="education"
        id="job-input"
        value={data.education}
        onChange={handleChange}
        required
        minLength="3"
        maxLength="30"
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;

/*
import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [age, setAge] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onAgeChange = (e) => {
    setAge(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
      age,
    });
  }

  return (
    <PopupWithForm
      name="popup__form_submit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <input
        type="text"
        placeholder="Введите имя"
        className="popup__input popup__input_type_job"
        name="name"
        id="name-input"
        value={name}
        onChange={onNameChange}
      />
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_job"
        name="about"
        id="job-input"
        value={description}
        onChange={onDescriptionChange}
      />

      <input
        type="number"
        placeholder="Возвраст"
        className="popup__input popup__input_type_age"
        name="age"
        id="age-input"
        value={age}
        onChange={onAgeChange}
        min="10"
        max="99"
      />
    </PopupWithForm>
  );
}


import React from 'react';
import { useForm } from 'react-hook-form';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [age, setAge] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // const onNameChange = (e) => {
  //   setName(e.target.value);
  // };

  // const onDescriptionChange = (e) => {
  //   setDescription(e.target.value);
  // };

  // const onAgeChange = (e) => {
  //   setAge(e.target.value);
  // };

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   onUpdateUser({
  //     name,
  //     about: description,
  //     age,
  //   });
  // }
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  function onSubmit(data) {
    onUpdateUser(data.name, data.email, data.password);
    console.log(data);
  }

  return (
    <PopupWithForm
      name="popup__form_submit"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      buttonText={'Сохранить'}
    >
      <input
        type="text"
        placeholder="Введите имя"
        className="popup__input popup__input_type_job"
        {...register('name', {
          required: 'Поле обязательно для заполнения',
          minLength: {
            value: 3,
            message: 'Имя должно содержать минимум 3 символа',
          },
          pattern: {
            value: /^[a-zA-Z][a-zA-Z0-9-_]{2,35}$/,
            message: 'Только латинские буквы и цифры, не более 35 символов',
          },
        })}
      ></input>
      <span className="login__input-error">{errors.name && errors.name.message}</span>

      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_job"
        name="about"
        {...register('about', {
          required: 'Поле обязательно для заполнения',
          minLength: {
            value: 3,
            message: 'Имя должно содержать минимум 3 символа',
          },
          pattern: {
            value: /^[a-zA-Z][a-zA-Z0-9-_]{2,35}$/,
            message: 'Только латинские буквы и цифры, не более 35 символов',
          },
        })}
      ></input>
      <span className="login__input-error">{errors.about && errors.about.message}</span>

      <input
        type="number"
        placeholder="Возвраст"
        className="popup__input popup__input_type_age"
        name="age"
        {...register('age', {
          required: 'Поле обязательно для заполнения',
          min: {
            value: 10,
            message: 'Имя должно содержать минимум 3 символа',
          },
          max: {
            value: 99,
            message: 'Имя должно содержать максимум 99 символа',
          },
        })}
      ></input>
      <span className="login__input-error">{errors.age && errors.age.message}</span>
    </PopupWithForm>
  );
}


export default EditProfilePopup;
*/
