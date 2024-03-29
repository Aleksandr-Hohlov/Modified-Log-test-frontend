import React from 'react';
//import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <button className="profile__avatar-edit" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__edit-name">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">
            <span className="profile__age">{currentUser.age} лет, </span>
            <span className="profile__city">{currentUser.city}, </span>
            <span className="profile__education">{currentUser.education}</span>
          </p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}>
          Написать пост
        </button>
      </section>

      <section className="elements">
        {cards
          .slice(0)
          .reverse()
          .map((card) => (
            <Card
              key={card._id}
              cards={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
      </section>
    </main>
  );
}

export default Main;
