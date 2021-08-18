import updateShopingCart from './shoping-cart';
import updateBookList from './book-list';
//reduser
const reducer = (state , action) => {
  return {
    bookList: updateBookList(state, action),
    shopingCart: updateShopingCart(state, action)
  }
};

export default reducer;
