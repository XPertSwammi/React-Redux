const updateBookList = (state, action) => {
    if(state===undefined) {
        return {
            books: [],
            loading: true,
            error: null,
        }
    }
    switch (action.type) {
        case 'BOOKS_LOADED':
          return {
            ...state,
            books: action.payload,
            loading: false
          };
    
        case 'BOOKS_REQUEST':
          return {
            books: [],
            loading: true,
            error: null
          };
    
        case 'BOOKS_ERROR':
          return {
            books: [],
            loading: false,
            error: action.payload
          };
        default: 
          return state.bookList;
    }
}

export default updateBookList;