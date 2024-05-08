/** @format */

import { saveBook, getAllBooks, getBookById, updateBookById, deleteBookById } from './handler.mjs';

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: saveBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },

  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },

  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookById,
  },

  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

export default routes;
