import React from "react"
import "./selection.css"




const Selection = ({genres, genreSelection, onGenreChange}) => (
    <div className="selection">
        <label>Genre</label>
        <select value={genreSelection} onChange={onGenreChange}>
            <option value="All" key="0">All</option>
            {
                genres.map(({name, id}) => (
                    <option value={name} key={id}>{name}</option>
                ))
            }
        </select>
    </div>
)


export default Selection
