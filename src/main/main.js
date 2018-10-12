import Movies from "./movies/movies"
import Navigation from "./navigation/navigation"
import "./main.css"
import React from "react"


class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            total_pages: 1,
            moviesUrl: "",
            genreSelection: "All",
            genres: [],
            movies: [],
            year: {
                label: "year",
                min: 1990,
                max: 2017,
                step: 1,
                value: { min: 2000, max: 2017 }
            },
            rating: {
                label: "rating",
                min: 0,
                max: 10,
                step: 1,
                value: { min: 8, max: 10 }
            },
            runtime: {
                label: "runtime",
                min: 0,
                max: 300,
                step: 15,
                value: { min: 60, max: 120 }
            }
        }
        this.onGenreChange = this.onGenreChange.bind(this)
        this.onSliderChange = this.onSliderChange.bind(this)
        this.setGenresState = this.setGenresState.bind(this)
        this.generateUrl = this.generateUrl.bind(this)
        this.onSearchButtonClick = this.onSearchButtonClick.bind(this)
        this.storeMovies = this.storeMovies.bind(this)
        this.fetchMovies = this.fetchMovies.bind(this)
        this.onPageIncrease = this.onPageIncrease.bind(this)
        this.onPageDecrease = this.onPageDecrease.bind(this)
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this)
        this.getStateFromLocalStorage = this.getStateFromLocalStorage.bind(this)
    }

    componentDidMount() {
        const savedState = this.getStateFromLocalStorage()
        const defaultState = this.state
        if (typeof savedState !== "undefined" && savedState !== null) {
            this.setState(savedState)
            this.generateUrl(savedState);
        } else {
            this.generateUrl(defaultState);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this.saveStateToLocalStorage(nextState)
        if (this.state.moviesUrl !== nextState.moviesUrl) {
            this.fetchMovies(nextState.moviesUrl);
        }
    }

    onPageIncrease() {
        const { page, total_pages } = this.state
        const nextPage = page + 1;
        if (nextPage <= total_pages) {
            let currentState = this.state
            currentState.page = nextPage
            this.generateUrl(currentState)
        }
    }

    onPageDecrease() {
        const nextPage = this.state.page - 1;
        if ( nextPage > 0 ) {
            let currentState = this.state
            currentState.page = nextPage
            this.generateUrl(currentState)
        }
    }

    storeMovies(data) {
        const movies = data.results.map(result => {
        const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date } = result;
            return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date }
        })
        this.setState({movies:movies, total_pages: data.total_pages})
    }

    fetchMovies(url) {
        fetch(url)
        .then(response => response.json())
        .then(data => this.storeMovies(data))
        .catch(error => console.log(error))
    }

    generateUrl(state) {
        const {genreSelection, genres, year, rating, runtime, page} = state;
        let moviesUrl = `https://api.themoviedb.org/3/discover/movie?` +
        `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
        `language=en-US&sort_by=popularity.desc&` +
        `primary_release_date.gte=${year.value.min}-01-01&` +
        `primary_release_date.lte=${year.value.max}-12-31&` +
        `vote_average.gte=${rating.value.min}&` +
        `vote_average.lte=${rating.value.max}&` +
        `with_runtime.gte=${runtime.value.min}&` +
        `with_runtime.lte=${runtime.value.max}&` +
        `page=${page}&`;
        if (genreSelection !== "All") {
            const selectedGenre = genres.find( genre => genre.name === genreSelection);
            const genreId = selectedGenre.id;
            moviesUrl = moviesUrl + `with_genres=${genreId}&`
        }
        this.setState({ moviesUrl, page });
    }

    onSearchButtonClick() {
        this.generateUrl(this.state);
    }

    setGenresState(genres) {
        this.setState({genres: genres})
    }

    onGenreChange(event) {
        this.setState({genreSelection: event.target.value})
    }

    onSliderChange(sliderType) {
        return function(value) {
            let currentState = this.state
            currentState[sliderType].value = value
            this.setState(currentState)
        }.bind(this)
    }

    saveStateToLocalStorage(state) {
        localStorage.setItem("testapp.params", JSON.stringify(state));
    }

    getStateFromLocalStorage() {
        return JSON.parse(localStorage.getItem("testapp.params"));
    }

    render() {
        return (
        <section className="main">
            <Navigation
                onGenreChange={this.onGenreChange}
                onSliderChange={this.onSliderChange}
                setGenresState={this.setGenresState}
                onSearchButtonClick = {this.onSearchButtonClick}
                {...this.state}
            />
            <Movies
                movies={this.state.movies}
                page={this.state.page}
                onPageIncrease={this.onPageIncrease}
                onPageDecrease={this.onPageDecrease}
            />
        </section>
        )
    }
}

export default Main;
