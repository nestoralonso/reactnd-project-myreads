import React, { Component } from "react"

import * as BooksAPI from "./BooksAPI"
import BookItem from "./BookItem"

class SearchPage extends Component {
  state = {
    books: null,
    query: ""
  }

  handleKeyPress = async e => {
    if (e.key === "Enter") {
      const query = this.refs.searchInput.value
      const books = await BooksAPI.search(query)
      this.setState({
        books: books.map(b => {
          b.shelf = "none"
          return b
        })
      })
    }
  }

  render() {
    const { books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a
            className="close-search"
            onClick={() => this.props.history.push("/")}
          >
            Close
          </a>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              ref="searchInput"
              placeholder="Search by title or author"
              onKeyPress={this.handleKeyPress}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books &&
              Array.isArray(books) &&
              books.map(book => (
                <BookItem
                  key={book.id}
                  data={book}
                  onActionSelected={this.props.onActionSelected}
                />
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
