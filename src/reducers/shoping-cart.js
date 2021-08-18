const updateOrderList = (state, bookId, q) => {
    const {bookList:{books}, shopingCart:{cartItems}} = state
    const book = books.find((book)=>book.id===bookId);
    const itemIdx = cartItems.findIndex(({id})=>book.id===id);
    const item = cartItems[itemIdx];
    const newItem = updateCartItem(book, item, q);
    return {
      ...state,
      cartItems: updateCartItems(cartItems, newItem,  itemIdx)
    }
}

const updateCartItems = (cartItems, item, itemIdx) => {
    if(itemIdx===-1) {
      return [
        ...cartItems,
        item
      ]
    }
    if(item.count===0) {
      return [
        ...cartItems.slice(0, itemIdx),
        ...cartItems.slice(itemIdx+1)
      ]
    }
    return [
      ...cartItems.slice(0, itemIdx),
      item,
      ...cartItems.slice(itemIdx+1)
    ] 
}
  
const updateCartItem = (book, item, q) => {
    if(item) {
      return {
        ...item,
        count: item.count+q,
        total: item.total+q*book.price
      }
    } else {
      return {
          id: book.id,
          name: book.title,
          count: 1,
          total: book.price
      }
    }
}
  
const updateShopingCart = (state, action) => {
    if(state===undefined) {
        return {
            cartItems: [],
            orderTotal: 10
        }
    }
    switch(action.type) {
        case 'BOOK_ADDDED_TO_CART':
            return updateOrderList(state, action.payload, 1);
          
          case  'BOOK_REMOVED_FROM_CART':
            return updateOrderList(state, action.payload, -1)
      
          case 'ALL_BOOK_REMOVED_FROM_CART':
            const item = state.shopingCart.cartItems.find(({id})=>action.payload===id);
            return updateOrderList(state, action.payload, -item.count);
      
          default:
            return state.shopingCart;
    }
}

export default updateShopingCart;