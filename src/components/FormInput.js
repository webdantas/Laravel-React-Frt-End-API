import React from "react";

class FormInput extends React.Component {
  state = {
    title: "",
    desc: "",
    author: ""
  };

  addValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addNewBook = e => {
    e.preventDefault();
    const newbook = {
      id: 4,
      image: require("../assets/tuhan.jpg"),
      title: this.state.title,
      desc: this.state.desc,
      author: this.state.author
    };
    this.props.newBook(newbook);
  };

  render() {
    const { title, desc, author } = this.state;
    return (
      <div>
        <form onSubmit={this.addNewBook}>
          <input
            type="text"
            name="title"
            placeholder="book title"
            onChange={this.addValue}
          />
          <textarea
            type="text"
            name="desc"
            value={desc}
            onChange={this.addValue}
          />
          <input
            type="text"
            name="author"
            placeholder="author"
            value={author}
            onChange={this.addValue}
          />
          <button>add buku</button>
        </form>
      </div>
    );
  }
}

export default FormInput;
