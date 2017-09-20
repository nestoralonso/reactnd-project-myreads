import React, { Component } from 'react';

class BookItem extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('cwrp', nextProps.data)
  }

  getThumbnailStyle() {
    const { data: { imageLinks: { thumbnail } = {} } = {} } = this.props;
    console.log('thumbnail', thumbnail);
    return {
      width: 128,
      height: 193,
      backgroundImage: thumbnail && `url(${thumbnail})`
    }
  }

  render() {
    console.log('BookItem');

    const { data } = this.props

    if (!data) return null

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={this.getThumbnailStyle()}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{data.title}</div>
        <div className="book-authors">{data.authors.length && data.authors[0]}</div>
      </div>
    );
  }
}

export default BookItem;
