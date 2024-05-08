/** @format */

import { nanoid } from 'nanoid';
import books from './books.mjs';
import { responseHelper, filterHelper } from './helper.mjs';

const saveBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(19);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (name === undefined) {
    return responseHelper(h, 'fail', 400, 'Gagal menambahkan buku. Mohon isi nama buku');
  }
  if (readPage > pageCount) {
    return responseHelper(h, 'fail', 400, 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((books) => books.id === id).length > 0;

  const responseData = {
    bookId: id,
  };

  if (isSuccess) {
    return responseHelper(h, 'success', 201, 'Buku berhasil ditambahkan', responseData);
  }

  return responseHelper(h, 'failed', 500, 'gagal untuk save buku');
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const theSameBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const responseData = {
      books: theSameBooks.map((book) => {
        return {
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        };
      }),
    };
    return responseHelper(h, 'success', 200, undefined, responseData);
  }

  if (reading) {
    return filterHelper(reading, 'reading', h);
  }

  if (finished) {
    return filterHelper(finished, 'finished', h);
  }

  const responseData = {
    books: books.map((book) => {
      return {
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      };
    }),
  };
  return responseHelper(h, 'success', 200, undefined, responseData);
};

const getBookById = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((book) => book.id === bookId);
  if (book) {
    const responseData = {
      book,
    };
    return responseHelper(h, 'success', 200, undefined, responseData);
  } else {
    return responseHelper(h, 'fail', 404, 'Buku tidak ditemukan');
  }
};

const updateBookById = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const { bookId } = request.params;

  if (name === undefined) {
    return responseHelper(h, 'fail', 400, 'Gagal memperbarui buku. Mohon isi nama buku');
  }
  if (readPage > pageCount) {
    return responseHelper(h, 'fail', 400, 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  }

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    return responseHelper(h, 'success', 200, 'Buku berhasil diperbarui');
  }

  return responseHelper(h, 'fail', 404, 'Gagal memperbarui buku. Id tidak ditemukan');
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    return responseHelper(h, 'success', 200, 'Buku berhasil dihapus');
  }

  return responseHelper(h, 'fail', 404, 'Buku gagal dihapus. Id tidak ditemukan');
};

export { saveBook, getAllBooks, getBookById, updateBookById, deleteBookById };
