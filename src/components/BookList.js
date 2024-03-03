import React from "react";
import PropTypes from "prop-types";

class BookList extends React.Component {
  render() {
    const product = this.props.books.map(item => (
      <div className="listbook" key={item.id}>
        <div className="imagenya">
          <img className="imgstyle" src={item.image} alt={item.name} />
        </div>
        <div className="descnya">
          <h3>Judul : {item.name}</h3>
          <p>
            <span className="desc">Description : {item.description}</span>
            <br />
            <span>Author: {item.author}</span>
          </p>
          <button onClick={() => this.props.add(item.id)}>Add to Fav</button>
        </div>
      </div>
    ));
    return (
      <div>
        <h2>Daftar Buku</h2>
        {product}
      </div>
    );
  }
}

BookList.propTypes = {
  book: PropTypes.number.isRequired
};

export default BookList;
