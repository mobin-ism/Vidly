import React, { Component } from "react";
import Like from "./common/like";

class MoviesTable extends Component {
  raisSort = (column) => {
    let order = "asc";
    if (this.props.sortedColumn.path === column) {
      order = this.props.sortedColumn.order === "asc" ? "desc" : "asc";
    }
    const sortedColumn = { path: column, order: order };
    this.props.onSort(sortedColumn);
  };
  render() {
    const { onSort, onLike, onDelete, movies } = this.props;
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th
              className="clickable"
              onClick={() => this.raisSort("title")}
              scope="col"
            >
              Title
            </th>
            <th
              className="clickable"
              onClick={() => this.raisSort("genre.name")}
              scope="col"
            >
              Genre
            </th>
            <th
              className="clickable"
              onClick={() => this.raisSort("numberInStock")}
              scope="col"
            >
              Stock
            </th>
            <th
              className="clickable"
              onClick={() => this.raisSort("dailyRentalRate")}
              scope="col"
            >
              Rate
            </th>
            <th scope="col">Favourite</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td>
                <Like isLiked={movie.liked} onClick={() => onLike(movie)} />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
