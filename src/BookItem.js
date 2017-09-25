import React, { Component } from "react"
import PropTypes from "prop-types"

class BookItem extends Component {
  static propTypes = {
    onActionSelected: PropTypes.func.isRequired
  }

  getThumbnailStyle() {
    const { data: { imageLinks: { thumbnail } = {} } = {} } = this.props
    return {
      width: 128,
      height: 193,
      backgroundImage: thumbnail && `url(${thumbnail})`
    }
  }

  onActionSelected = e => {
    console.log('e=', e);
    if (!e || !e.target) return
    this.props.onActionSelected(this.props.data, e.target.value)
  }

  render() {
    const { data } = this.props

    if (!data) return null

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.getThumbnailStyle()} />
          <div className="book-shelf-changer">
            <select onChange={this.onActionSelected} value={data.shelf}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">
          {data.authors && data.authors.length > 0 && data.authors[0]}
        </div>
      </div>
    )
  }
}

export default BookItem
