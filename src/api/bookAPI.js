import { firestore } from "../firebase";

const collection = firestore.collection("books");

export const bookAPI = {
  remove: (id) => collection.doc(id).delete(),
  addBook: (authors, name, year, isbn) => collection.add({ authors, name, year, isbn }).then(doc => doc.id),
  editBook: (id, authors, name, year, isbn) => collection.doc(id).set({ authors, name, year, isbn })
}