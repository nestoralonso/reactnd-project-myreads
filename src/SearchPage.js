import React, { Component } from "react"
import { Link } from "react-router-dom"

import debounce from "lodash.debounce"
import * as BooksAPI from "./BooksAPI"
import BookItem from "./BookItem"

class SearchPage extends Component {
  state = {
    books: null,
    query: ""
  }

  queryUpdated = debounce(async query => {
    try {
      const response = await BooksAPI.search(query)
      if (!response || response.error) {
        this.setState({ books: [] })
      }

      const books = response
      this.setState({ books })
    } catch (error) {
      console.error('Something gone wrong', error)
      this.setState({ books: [] })
    }
  }, 180)

  handleChange = (e) => {
    const query = e.target.value
    this.setState({ query })
    this.queryUpdated(query)
  }

  getBookShelf(bookId) {
    const { myBooks } = this.props

    return myBooks[bookId] && myBooks[bookId].shelf
  }

  render() {
    const { books } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div>
            <Link to="/">Back to main page</Link>
          </div>

          <ol className="books-grid">
            {books &&
              Array.isArray(books) &&
              books.map(book => (
                <BookItem
                  key={book.id}
                  data={book}
                  shelfId={this.getBookShelf(book.id) || 'none'}
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
