import React from "react"
import styled from "styled-components"

const Books = props => {
    const book = props.book
    return (
	    <BookCard>
	    	<h4>{ book.name }</h4>
	    	<div className="section">
	    		<h5>Author:</h5>
	    		<p>Name: { book.author['first_name'] + " " + book.author['last_name'] }</p>
	    		<p>Birthday: { book.author.birthday }</p>
	    	</div>
	    	<div className="section">
	    		<h5>Types:</h5>
	    		<p>
	    			{ book.types.map((type, i) => {
	    				if (0 === i) return type.name
	    				else return `, ${type.name}`
	    			}) }
	    		</p>
	    	</div>
	    </BookCard>
    )
}

export default Books

const BookCard = styled.div`
	width: 200px;
	height: 300px;
	display: flex;
	background-color: white;
	border-radius: 10px;
	padding: 15px;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	margin-bottom: 25px;

	.section {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}
`