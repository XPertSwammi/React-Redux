import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { fetchBooks, itemAddedToCart} from '../../actions';
import { compose } from '../../utils';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import './book-list.css';

const BookList = ({books, onAddedToCart}) => {
  return(
    <ul className="book-list">
    {
      books.map((book) => {
        return (
          <li key={book.id}><BookListItem book={book} onAddedToCart={()=>onAddedToCart(book.id)}/></li>
        )
      })
    }
  </ul>
  )
}


class BookListContainer extends Component {

  componentDidMount() {
    this.props.fetchBooks();
  }

  render() {
    const { books, loading, error, onAddedToCart } = this.props;
    if (loading) {
      return <Spinner/>;
    }
    if (error) {
      return <ErrorIndicator/>
    }
    return (
      <BookList books={books} onAddedToCart={onAddedToCart}/>
    );
  }
}

const mapStateToProps = ({bookList:{ books, loading, error }}) => {
  return { books, loading, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {bookstoreService} = ownProps;
  return {
    fetchBooks: fetchBooks(dispatch, bookstoreService),
    onAddedToCart: (itemId)=> dispatch(itemAddedToCart(itemId))
  }
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);
