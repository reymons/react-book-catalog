import React, { useCallback, useContext, useEffect, useReducer, useRef } from "react";
import { bookAPI } from "../api/bookAPI";
import { firestore } from "./../firebase";

const BookContext = React.createContext();

const collection = firestore.collection("books");

export const useBookContext = () => useContext(BookContext);

const SET_BOOKS = "SET_BOOKS";
const TOGGLE_FETCHING = "TOGGLE_FETCHING";
const SET_NO_BOOKS_LEFT = "SET_NO_BOOKS_LEFT";
const REMOVE_BOOK = "REMOVE_BOOK";
const ADD_BOOK = "ADD_BOOK";
const EDIT_BOOK = "EDIT_BOOK"; 

const initialState = {
  books: [],
  fetching: false,
  noBooksLeft: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return { ...state, books: [...state.books, ...action.books] }
    case TOGGLE_FETCHING:
      return { ...state, fetching: action.fetching }
    case SET_NO_BOOKS_LEFT:
      return { ...state, noBooksLeft: action.noBooksLeft }
    case REMOVE_BOOK:
      return { ...state, books: state.books.filter(b => b.id !== action.id) }
    case ADD_BOOK:
      return { ...state, books: [action.book, ...state.books] }
    case EDIT_BOOK:
      return { ...state, books: state.books.map(b => b.id === action.newBookData.id ? action.newBookData : b) }
    default:
      return state
  } 
}

const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const lastDocRef = useRef();

  const addBook = ({ name, authors, year, isbn }) => {
    toggleFetchingDispatcher(true);
    bookAPI.addBook(authors, name, year, isbn).then(id => {
      addBookDispatcher({ id, name, authors, year, isbn })
      toggleFetchingDispatcher(false);
    });
  }

  const removeBook = (id) => {
    toggleFetchingDispatcher(true);
    bookAPI.remove(id).then(() => {
      removeBookDispatcher(id);
      toggleFetchingDispatcher(false);
    });
  }

  const editBook = (id, { authors, name, year, isbn }) => {
    toggleFetchingDispatcher(true);
    bookAPI.editBook(id, authors, name, year, isbn).then(() => {
      editBookDispatcher({ id, authors, name, year, isbn });
      toggleFetchingDispatcher(false);
    })
  }

  const toggleFetchingDispatcher = (isFetching) => dispatch({ type: TOGGLE_FETCHING, fetching: isFetching });

  const setBooksDispatcher = (books) => dispatch({ type: SET_BOOKS, books });

  const addBookDispatcher = (book) => dispatch({ type: ADD_BOOK, book });

  const removeBookDispatcher = (id) => dispatch({ type: REMOVE_BOOK, id });

  const editBookDispatcher = (newBookData) => dispatch({ type: EDIT_BOOK, newBookData });

  const fetchBooks = useCallback((limit = 10) => {
    toggleFetchingDispatcher(true);
    collection
      .orderBy("name")
      .startAfter(lastDocRef.current || 0)
      .limit(limit)
      .get()
      .then(data => {
        if (data.size === 0 && !state.noBooksLeft) {
          dispatch({ type: SET_NO_BOOKS_LEFT, noBooksLeft: true });
        } else {
          const result = data.docs.map(doc => {
            return { id: doc.id, ...doc.data()}
          });
          setBooksDispatcher(result);
          
          lastDocRef.current = data.docs[data.docs.length - 1];
        }
          toggleFetchingDispatcher(false);
      });
  }, [state.noBooksLeft]);

  useEffect(() => {
    fetchBooks(10);
  }, [fetchBooks])

  const value = {
    state: state,
    books: state.books,
    fetchingBooks: state.fetching,
    noBooksLeft: state.noBooksLeft,
    removeBook, fetchBooks,
    addBook, editBook
  }

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  )
}

export default BookProvider;