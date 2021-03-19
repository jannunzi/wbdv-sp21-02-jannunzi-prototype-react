import React, {useState, useEffect} from 'react'
import {Link, useParams, useHistory} from "react-router-dom";
import movieService from "../services/movie-service"

const SearchScreen = () => {
    const history = useHistory()
    const {title} = useParams()
    const [searchTitle, setSearchTitle] = useState(title)
    const [results, setResults] = useState({Search: []})
    useEffect(() => {
        setSearchTitle(title)
        findMoviesByTitle(title)
    }, [])
    const findMoviesByTitle = (title) => {
        history.push(title)
        movieService.findMoviesByTitle(title)
            .then((results) => {
                setResults(results)
            })
    }
    return(
        <div>
            <h2>Search Screen</h2>
            <div className="row">
                <div className="col-9">
                    <input value={searchTitle}
                           onChange={(event) => {
                               setSearchTitle(event.target.value)
                           }}
                           className="form-control"/>
                </div>
                <div className="col-3">
                    <button
                        onClick={() => {
                            findMoviesByTitle(searchTitle)
                        }}
                        className="btn btn-primary btn-block">
                        Search
                    </button>
                </div>
            </div>
            <br/>
            <ul className="list-group">
                {
                    results && results.Search && results.Search.map((movie) => {
                        return(
                            <li className="list-group-item">
                                <Link to={`/details/${movie.imdbID}`}>
                                    {movie.Title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default SearchScreen