import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListGroup from './common/listGroup';
import SearchBox from './common/searchBox';
import Pagination from './common/pagination';
import { getMovies, deleteMovies } from '../services/movieService';
import { getGenres } from '../services/genreService'
import { paginate } from '../utils/paginate';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        currentPage: 1,
        pageSize: 4,
        genres: [],
        sortColumn: {path: 'title',order: 'asc'},
        searchQuery: '',
        selectedGenre: null,
    }

    async componentDidMount() {
        const { data } = await getGenres();
        const genres = [{"_id": '',name: 'All Genres'}, ...data]
        
        const { data: movies } = await getMovies();
        this.setState({ movies, genres })
    }

    handleDelete = async movie => {
        // const movies = this.state.movies.filter(m => m._id !== movie._id)
        // this.setState({ movies })

        const originlMovies = this.state.movies;
        const movies = originlMovies.filter(m => m._id !== movie._id);
        this.setState({ movies })
        try {
            await deleteMovies(movie._id)
        } catch (error) {
            if(error.response && error.response.status === 400) {
                toast.error('This movie is been deleted');
                this.setState({ movies: originlMovies })
            }
        }

    }

    handleLiked = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenresSelect = genre => {
        this.setState({ selectedGenre : genre, searchQuery: '', currentPage : 1})
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }

    getPageData = () => {
        const { movies: allMovies, pageSize, currentPage,  searchQuery, selectedGenre,sortColumn } = this.state;
        // const filtered = selectedGenre && selectedGenre._id ? allMovies.filter(item => item.genre._id === selectedGenre._id) : allMovies

        let filtered = allMovies;
        if(searchQuery) filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        else if(selectedGenre && selectedGenre._id) filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order])

        const movies = paginate(sorted, currentPage, pageSize);

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, selectedGenre,sortColumn, searchQuery } = this.state;
        const { user } = this.props;

        if (count === 0) {
            return <p>There are no movies in the database</p>
        }
        const { totalCount, data: movies } = this.getPageData()
        return (
            <div className='row'>
                <div className="col-2">
                    <ListGroup items={this.state.genres} selectedItem={selectedGenre} onItemSelect={this.handleGenresSelect}/>
                </div>
                <div className="col">
                    {user && <Link to='/movies/new' className='btn btn-primary'>New Moive</Link>}
                    <p>Showing {totalCount} movies in the database</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
                    <MoviesTable onLiked={this.handleLiked} onDelete={this.handleDelete} sortColumn={sortColumn} movies={movies} onSort={this.handleSort}/>
                    <Pagination total={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
                </div>
            </div>
        );
    }
}

export default Movies;