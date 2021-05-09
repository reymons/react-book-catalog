import { useBookContext } from "../contexts/BookContext";
import Book from "./Book";
import "./../styles/ManagePage.scss";
import useFetchOnIntersection from "../utils/useFetchOnIntersection";
import { useCallback, useEffect } from "react";

let limit = 5;

const Manage = () => {
  const { books, addBook, fetchBooks, fetchingBooks, noBooksLeft, editBook } = useBookContext();
  
  const onScrollFetch = useCallback(() => {
    fetchBooks(limit);
  }, [fetchBooks]);

  const { observableNodeRef, observerRef } = useFetchOnIntersection(onScrollFetch);

  const getFormInfo = (data) => {
    let authors;
    try {
      authors = [...data.authors].map(a => a.value)
    } catch {
      authors = [data.authors.value]
    }

    return {
      name: data.name.value,
      authors: authors,
      year: data.year.value,
      isbn: data.isbn.value
    }
  }

  const onAddBook = (data) => {
    const dataCollection = getFormInfo(data);

    addBook({ ...dataCollection });
  }

  const onEditBook = (id, data) => {
    const dataCollection = getFormInfo(data);

    editBook(id, { ...dataCollection })
  }

  useEffect(() => {
    if (noBooksLeft) {
      observerRef.current.unobserve(observableNodeRef.current);
    }
  }, [noBooksLeft, observerRef, observableNodeRef])

  return (
    <div className="manage">
      <h2 className="manage__title">Управление книгами</h2>
      <div className="manage__library library">
        <ul className="library__list">
          <li className="library__book">
            <Book provideData={onAddBook} type="add" />
          </li>
          {
            books.map(book => 
              <li className="library__book" key={book.id}>
                <Book
                  name={book.name}
                  authors={book.authors}
                  year={book.year}
                  isbn={book.isbn}
                  type="edit"
                  provideData={(data) => onEditBook(book.id, data)}
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

export default Manage;