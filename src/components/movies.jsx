import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "../components/common/listGroup";
import Pagination from "../components/common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import swal from "sweetalert";
import MoviesTable from "./moviesTable";
import Like from "./common/like";
import Navbar from "./navbar";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 3,
    currentPage: 1,
    currentGenre: "all",
    sortedColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "all", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    swal("Congo!", "Your imaginary movie has been liked!", "success");
    const index = this.state.movies.indexOf(movie);
    let movies = [...this.state.movies];
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handleOnItemSelect = (genreId) => {
    this.setState({ currentGenre: genreId, currentPage: 1 });
  };

  handleSort = (sortedColumn) => {
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
      [this.state.sortedColumn.path],
      [this.state.sortedColumn.order]
    );
    return sortedMovieList;
  }

  // PAGINATE THE MOVIES
  paginateMovies() {
    return paginate(
      // THIS LIST WILL GET GENERATED AFTER FILTERING AND SORTING
      this.getMovieList(),
      this.state.currentPage,
      this.state.pageSize
    );
  }

  render() {
    const { genres, currentGenre, sortedColumn, pageSize } = this.state;
    return (
      <React.Fragment>
        <main className="container">
          <div className="row m-5">
            <div className="col-3">
              <ListGroup
                items={genres}
                onItemSelect={this.handleOnItemSelect}
                currentItem={currentGenre}
                valueProperty="_id"
                textProperty="name"
              />
            </div>
            <div className="col-9">
              <div className="row m-1">
                <h4>{this.numberOfMovies()}</h4>
              </div>
              <MoviesTable
                onSort={this.handleSort}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                movies={this.paginateMovies()}
                sortedColumn={sortedColumn}
              />
              <Pagination
                // THIS LIST WILL GET GENERATED AFTER FILTERING AND SORTING
                totalItems={this.getMovieList().length}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={this.state.currentPage}
              />
            </div>
          </div>
        </main>
      </React.Fragment>
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
