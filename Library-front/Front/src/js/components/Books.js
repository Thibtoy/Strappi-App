import React, { useState, useEffect } from "react"
import styled from "styled-components"
import api from "../utils/api"
import BookCard from "./BookCard"
import FilterBar from "./FilterBar"

const Books = () => {
	const [books, setBooks] = useState([])

    useEffect(() => {
	    api.get('books')
	        .then(response => setBooks(response.data))
	        .catch(err => { throw err })
    }, [])

    return (
	  	<React.Fragment>
	  		<FilterBar setBooks={ setBooks }/>
		    <Gallery>
		    	{ books.length > 0 && books.map((book, i) => <BookCard book={ book } key={ i }/>)}
		    </Gallery>
		</React.Fragment>
    )
}

export default Books

const Gallery = styled.div`
	width: 80%;
	margin: auto;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	flex-wrap: wrap;
`