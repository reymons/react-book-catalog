import { useCallback, useEffect } from "react";
import { useBookContext } from "../contexts/BookContext";
import useFetchOnIntersection from "../utils/useFetchOnIntersection";
import "./../styles/MainPage.scss";
import Book from './Book';
import { Link } from "react-router-dom";

let limit = 5;

const Books = () => {
  const { books, removeBook, fetchBooks, fetchingBooks, noBooksLeft } = useBookContext();

  const onScrollFetch = useCallback(() => {
    fetchBooks(limit);
  }, [fetchBooks]);

  const { observableNodeRef, observerRef } = useFetchOnIntersection(onScrollFetch);

  useEffect(() => {
    if (noBooksLeft) {
      observerRef.current.unobserve(observableNodeRef.current);
    }
  }, [noBooksLeft, observerRef, observableNodeRef])

  return (
    <div className="books">
      <div className="books__btn-wrapper">
        <Link className="books__btn" to="/manage">Добавить книгу</Link>
      </div>
      <br/>
      <div className="books__library library">
        <ul className="library__list">
          {
            books.map(book => 
              <li className="library__book" key={book.id}>
                <Book
                  name={book.name}
                  year={book.year}
                  authors={book.authors}
                  isbn={book.isbn}
                  onClick={() => removeBook(book.id)}
                  btnTitle="Удалить"
                />
              </li>
            )
          }
        </ul>
      </div>
      <div
        ref={observableNodeRef}
        className="books__fetch-point" 
        style={{
          height:"25px", 
          display: fetchingBooks ? "none" : "block"
        }}
        >
      </div>
      <div className="books__message">
        {noBooksLeft && !fetchingBooks && "Больше книг нет"}
        {!noBooksLeft && fetchingBooks && "Подгружаем книги..."}
      </div>
    </div>
  )
}

export default Books;