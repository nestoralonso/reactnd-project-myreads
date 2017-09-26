import React, { Component } from "react"
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
      const books = await BooksAPI.search(query)

      if (!books) return

      this.setState({
        books: books.map(b => {
          return b
        })
      })
    } catch (error) {
      console.error('Something gone wrong', error)
    }
  }, 180)

  handleChange = (e) => {
    const query = e.target.value
    this.setState({ query })
    this.queryUpdated(query)
  }

  render() {
    const { books } = this.state
    const { shelves } = this.props
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
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
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
                  shelfId={shelves[book.id] || 'none'}
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
