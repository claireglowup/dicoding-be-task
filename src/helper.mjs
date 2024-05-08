/** @format */
import books from './books.mjs';

const responseHelper = (h, status, codeStatus, message, data) => {
  const response = h.response({
    status,
    message,
    data,
  });

  response.code(codeStatus);
  return response;
};

const filterHelper = (queryName, field, h) => {
  let filterConditionQueryName;

  if (queryName === '1') {
    filterConditionQueryName = true;
  } else if (queryName === '0') {
    filterConditionQueryName = false;
  }

  if (filterConditionQueryName !== undefined) {
    let theSameBooks;
    if (field == 'reading') {
      theSameBooks = books.filter((book) => book.reading === filterConditionQueryName);
    } else if (field === 'finished') {
      theSameBooks = books.filter((book) => book.finished === filterConditionQueryName);
    }
    const responseData = {
      books: theSameBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    };
    return responseHelper(h, 'success', 200, undefined, responseData);
  }
};

export { filterHelper, responseHelper };
