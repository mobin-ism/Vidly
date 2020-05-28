import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "../components/common/like";
import ListGroup from "../components/common/listGroup";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import swal from 'sweetalert';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "all",
    sortedColumn: { name: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "all", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  
  deleteMovieObject = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };

  handleLikeButton = (movie) => {
    swal("Congo!", "Your imaginary movie has been liked!", "success");
    const index = this.state.movies.indexOf(movie);
    let movies = [...this.state.movies];
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handlegenreChange = (genreId) => {
    this.setState({ currentGenre: genreId, currentPage: 1 });
  };

  onSort = (column) => {
    let order = "asc";
    if (this.state.sortedColumn.name === column) {
      order = this.state.sortedColumn.order === "asc" ? "desc" : "asc";
    }
    const sortedColumn = { name: column, order: order };
    this.setState({ sortedColumn });
  };

  // THIS LIST WILL GET GENERATED AFTER FILTERING AND SORTING
  getMovieList() {
    let movies = this.state.movies;
    if (this.state.currentGenre !== "all") {
      movies = this.state.movies.filter(
        (m) => m.genre._id === this.state.currentGenre
      );
    }
  
    const sortedMovieList = _.orderBy(
      movies,
      [this.state.sortedColumn.name],
      [this.state.sortedColumn.order]
    );
    return sortedMovieList;
  }
  render() {
    return (
      <main className="container">
        <div className="row m-5">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              onItemSelect={this.handlegenreChange}
              currentItem={this.state.currentGenre}
              valueProperty="_id"
              textProperty="name"
            />
          </div>
          <div className="col-9">
            <div className="row m-1">
              <h4>{this.numberOfMovies()}</h4>
            </div>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th
                    className="clickable"
                    onClick={() => this.onSort("title")}
                    scope="col"
                    
                  >
                    Title
                  </th>
                  <th
                    className="clickable"
                    onClick={() => this.onSort("genre.name")}
                    scope="col"
                    
                  >
                    Genre
                  </th>
                  <th
                    className="clickable"
                    onClick={() => this.onSort("numberInStock")}
                    scope="col"
                    
                  >
                    Stock
                  </th>
                  <th
                    className="clickable"
                    onClick={() => this.onSort("dailyRentalRate")}
                    scope="col"
                    
                  >
                    Rate
                  </th>
                  <th scope="col">Favourite</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginate(
                  // THIS LIST WILL GET GENERATED AFTER FILTERING AND SORTING
                  this.getMovieList(),
                  this.state.currentPage,
                  this.state.pageSize
                ).map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <Like
                        isLiked={movie.liked}
                        onClick={() => this.handleLikeButton(movie)}
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.deleteMovieObject(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              // THIS LIST WILL GET GENERATED AFTER FILTERING AND SORTING
              totalItems={this.getMovieList().length}
              pageSize={this.state.pageSize}
              onPageChange={this.handlePageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </main>
    );
  }

  numberOfMovies() {
    // THIS LIST WILL GET GENERATED AFTER FILTERING AND SORTING
    let numberOfMovies = this.getMovieList().length;
    return numberOfMovies === 0
      ? "No movies found in the list"
      : "Number of movies found is " + numberOfMovies;
  }
}

export default Movies;
