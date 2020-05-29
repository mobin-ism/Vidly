import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    { label: "title name", path: "title", content : (movie) => <Link to={"/movies/"+movie._id}>{movie.title}</Link>},
    { label: "genre", path: "genre.name" },
    { label: "stock", path: "numberInStock" },
    { label: "rate", path: "dailyRentalRate" },
    {
      label: "favourite",
      content: (movie) => (
        <Like isLiked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      label: "action",
      content: (movie) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];
  raisSort = (column) => {
    let order = "asc";
    if (this.props.sortedColumn.path === column) {
      order = this.props.sortedColumn.order === "asc" ? "desc" : "asc";
    }
    const sortedColumn = { path: column, order: order };
    this.props.onSort(sortedColumn);
  };
  render() {
    const { movies } = this.props;
    return (
      <Table columns={this.columns} onSort={this.raisSort} data={movies} />
    );
  }
}

export default MoviesTable;
