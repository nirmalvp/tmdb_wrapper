import React from "react"
import "./navigation.css"
import Selection from "./selection"
import Slider from "./slider"
import Button from "./button"



class Navigation extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const setGenresState = this.props.setGenresState
        const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
        fetch(genresURL)
            .then(response => response.json())
            /*.then(data => {
                return new Promise(resolve => setTimeout(() => resolve(data), 10000));
            })*/
            .then(data => setGenresState(data.genres))
            .catch(error => console.log(error));
    }

    render() {
      const { genreSelection, genres, onGenreChange, onSliderChange, year, rating, runtime, onSearchButtonClick } = this.props;
      return (
        <section className="navigation">
            <Selection
                genres={genres}
                genreSelection = {genreSelection}
                onGenreChange = {onGenreChange}
            />
            <Slider data={year} onChanged={onSliderChange("year")} />
            <Slider data={rating} onChanged={onSliderChange("rating")} />
            <Slider data={runtime} onChanged={onSliderChange("runtime")} />
            <Button onClick={onSearchButtonClick}>
                Search Movies
            </Button>
        </section>
      )
    }
}

export default Navigation
