import React from "react"
import { Route } from "react-router-dom"
import * as BooksAPI from "./BooksAPI"
import "./App.css"
import BookItem from "./BookItem"
import SearchPage from "./SearchPage"

const Shelf = {
  CurrentlyReading: "currentlyReading",
  WantToRead: "wantToRead",
  Read: "read"
}

const ShelfTitle = {
  currentlyReading: "Currently Reading",
  wantToRead: "Want To Read",
  read: "Read"
}

class BooksApp extends React.Component {
  state = {
    books: {},
  }

  componentDidMount() {
    this.fetchAllBooks()
  }

  fetchAllBooks = async () => {
    const booksArray = await BooksAPI.getAll()
    const books = {}
    for (const book of booksArray) {
      books[book.id] = book
    }

    this.setState({
      books,
    })
  }

  onActionSelected = (book, shelfId) => {
    this.setState(prevState => {
      const { books: oldBooks } = prevState
      const newBook = {...book, shelf: shelfId}
      let { [book.id]: targetBook, ...restBooks } = oldBooks
      if (shelfId !== 'none') {
        restBooks[book.id] = newBook
      }

      BooksAPI.update(newBook, shelfId)
      return {
        books: restBooks,
      }
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route path="/" exact render={this.renderList} />

        <Route
          path="/search"
          render={({ history }) => (
            <SearchPage
              myBooks={books}
              history={history}
              onActionSelected={this.onActionSelected}
            />
          )}
        />
      </div>
    )
  }

  getShelfBooks(shelf) {
    const { books } = this.state
    return Object.keys(books)
              .map(bookId => books[bookId])
              .filter(book => book.shelf === shelf)
  }

  renderShelf(shelf) {
    const { books } = this.state
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ShelfTitle[shelf]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.getShelfBooks(shelf).map(book => (
              <li key={book.id}>
                <BookItem
                  data={book}
                  shelfId={books[book.id].shelf}
                  onActionSelected={this.onActionSelected}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

  renderList = ({ history }) => {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.renderShelf(Shelf.CurrentlyReading)}
            {this.renderShelf(Shelf.WantToRead)}
            {this.renderShelf(Shelf.Read)}
          </div>
        </div>
        <div className="open-search">
          <a
            onClick={() => {
              history.push("/search")
            }}
          >
            Add a book
          </a>
        </div>
      </div>
    )
  }
}

export default BooksApp
