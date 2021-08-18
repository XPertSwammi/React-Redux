
const booksLoaded = (newBooks) => {
  return {
    type: 'BOOKS_LOADED',
    payload: newBooks
  };
};

const booksRequest = () => {
  return {
    type: 'BOOKS_REQUEST'
  }
}

const booksError = (error) => {
  return {
    type: 'BOOKS_ERROR',
    payload: error
  }
}

const fetchBooks = (dispatch, bookstoreService) => () => {
  dispatch(booksRequest());
  bookstoreService.getBooks()
    .then((data)=>{
      dispatch(booksLoaded(data));
  })
    .catch((error)=>{
      dispatch(booksError(error));
  });
}

const itemAddedToCart = (itemId) => {
  return {
    type: 'BOOK_ADDDED_TO_CART',
    payload: itemId
  }
}

const bookRemovedFromCart = (itemId) => {
  return {
    type: 'BOOK_REMOVED_FROM_CART',
    payload: itemId
  }
}
const allBookRemovedFromCart = (itemId) => {
  return {
    type: 'ALL_BOOK_REMOVED_FROM_CART',
    payload: itemId
  }
}

export {
  fetchBooks,
  itemAddedToCart,
  bookRemovedFromCart,
  allBookRemovedFromCart
};
