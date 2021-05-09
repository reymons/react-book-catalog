import React, { useState } from "react";
import "./../styles/Book.scss";
import Button from "./Form/Button";
import Field from "./Form/Field";
import Form from "./Form/Form";

const AUTHOR_LIMIT = 3;

const Book = ({ name, authors, year, isbn, onClick, type, provideData }) => {
  const [authorFieldCount, setAuthorFieldCount] = useState(type === "edit" ? authors.length : 1);
  const [addMode, setAddMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const authorFields = [];

  for (let i = 1; i <= authorFieldCount; i++) {
    authorFields.push(
      <React.Fragment key={i}>
        <Field className="book__input book__input-author" name="authors" type="text" placeholder={`Автор ${i}`} value={authors && authors[i - 1]} required />
        { 
          authorFieldCount === 1
          ? <i className="book__fa-plus fas fa-plus" onClick={() => setAuthorFieldCount(prev => prev + 1)}></i>
          : authorFieldCount === AUTHOR_LIMIT && i === authorFieldCount
          ? <i className="book__fa-minus fas fa-minus" onClick={() => setAuthorFieldCount(prev => prev - 1)}></i>
          : i === authorFieldCount &&
          <>
            <i className="book__fa-plus fas fa-plus" onClick={() => setAuthorFieldCount(prev => prev + 1)}></i>
            <i className="book__fa-minus fas fa-minus" onClick={() => setAuthorFieldCount(prev => prev - 1)}></i>
          </>
        }
      </React.Fragment>
    )
  }

  if (type === "add") {
    const onFormSubmit = (data) => {
      provideData(data);
      setAddMode(false);
    }

    return (
      <div className="book">
      {
        addMode
        ?
          <>
            <div className="book__img">Изображение</div>
            <div className="book__desc">
              <Form className="book__form" onSubmit={onFormSubmit}>
                <div className="book__input-wrapper">
                  <Field className="book__input" name="name" type="text" placeholder="Название" required />
                </div>
                <div className="book__input-wrapper">
                  { authorFields }
                </div>
                <div className="book__input-wrapper">
                  <Field className="book__input" name="year" type="number" placeholder="Год издания" required />
                </div>
                <div className="book__input-wrapper">
                  <Field className="book__input" name="isbn" type="text" placeholder="ISBN" required />
                </div>
                <div className="book__btn">
                  <Button>Добавить</Button>
                </div>
              </Form>
            </div>
          </>
        : <div className="book__add-book-plus-wrapper" onClick={() => setAddMode(true)}>
            <i className="book__add-book-plus fas fa-plus"></i>
          </div>
      }
      </div> 
    )
  }

  if (type === "edit") {
    const onFormSubmit = (data) => {
      provideData(data);
      setEditMode(false);
    }

    return (
      <div className="book">
        {
          editMode
          ? <>
              <div className="book__img">Изображение</div>
                <div className="book__desc">
                  <Form className="book__form" onSubmit={onFormSubmit}>
                    <div className="book__input-wrapper">
                      <Field className="book__input" name="name" type="text" placeholder="Название" value={name} required />
                    </div>
                    <div className="book__input-wrapper">
                      { authorFields }
                    </div>
                    <div className="book__input-wrapper">
                      <Field className="book__input" name="year" type="number" placeholder="Год издания" value={year} required />
                    </div>
                    <div className="book__input-wrapper">
                      <Field className="book__input" name="isbn" type="text" placeholder="ISBN" value={isbn} required />
                    </div>
                    <div className="book__btn">
                      <Button>Сохранить</Button>
                    </div>
                  </Form>
                </div>
            </>
          : <>
              <div className="book__img">Изображение</div>
              <div className="book__desc">
                <p className="book__desc-item"><b>Название: </b><span className="book__span">{name}</span></p>
                <p className="book__desc-item">
                  <b>Автор: </b>
                  <span className="book__span">{authors.join(", ")}</span>
                </p>
                <p className="book__desc-item"><b>Год издания: </b><span className="book__span">{year}</span></p>
                <p className="book__desc-item"><b>ISBN: </b><span className="book__span">{isbn}</span></p>
              </div>
              <div className="book__btn">
                <Button onClick={() => setEditMode(true)}>{"Редактировать"}</Button>
              </div>
            </>
        }
      </div>
    )
  }

  return (
    <div className="book">
      <div className="book__img">Изображение</div>
      <div className="book__desc">
        <p className="book__desc-item"><b>Название: </b><span className="book__span">{name}</span></p>
        <p className="book__desc-item">
          <b>Автор: </b>
          <span className="book__span">{authors.join(", ")}</span>
        </p>
        <p className="book__desc-item"><b>Год издания: </b><span className="book__span">{year}</span></p>
        <p className="book__desc-item"><b>ISBN: </b><span className="book__span">{isbn}</span></p>
      </div>
      <div className="book__btn">
        <Button onClick={onClick}>{"Удалить"}</Button>
      </div>
    </div>
  )
}

export default Book;