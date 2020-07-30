import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAuthors, getTypes, setAuthors, setTypes } from "../store/books"

import styled from "styled-components"
import api from "../utils/api"
import BookCard from "./BookCard"

const FilterBar = (props) => {
	const dispatch = useDispatch()
	const [tags, setTags] = useState(false)
	const [body, setBody] = useState({})
	const types = useSelector(getTypes)
	const authors = useSelector(getAuthors)

	const onChange = event => {
		if (!body[event.target.getAttribute('filter')]) body[event.target.getAttribute('filter')] = new Object()

		if (0 == event.target.value) body[event.target.getAttribute('filter')] = {}
		else if (body[event.target.getAttribute('filter')][event.target.value]) delete body[event.target.getAttribute('filter')][event.target.value]
		else body[event.target.getAttribute('filter')][event.target.value] = true

		event.target.value = "0"
		setBody(body)
		refreshTags()
	}

	const onSubmit = event => {
		event.preventDefault()
		let urlParams = "?"
		let filterNb = 0
		for (let filter in body) {
			let count = 0

			if (body[filter] && Object.keys(body[filter]).length > 0) urlParams += (0 === filterNb)? `${filter}=` : `&${filter}=`
			for (let value in body[filter]) {
				urlParams += (0 === count)? value.split(' ').join('-') : `,${value.split(' ').join('-')}`
				count++
			}

			filterNb++
		}
		api.get(`books/filtered${urlParams}`)
			.then(response => props.setBooks(response.data))
		    .catch(err => { throw err })
	}

	const removeFilter = event => {
		let target = event.currentTarget
		delete body[target.getAttribute('filter')][target.getAttribute('name')]
		refreshTags()
	}

	const refreshTags = () => {
		let tags = false
		for (let filter in body) {
			for (let value in body[filter]) {
				if (!tags) tags = []
				tags.push(<p key={ value }>{ value } <span filter={ filter } name={ value } onClick={ removeFilter }>X</span></p>)
			}
		}
		setTags(tags)
	}

    useEffect(() => {
    	if (!types) {
    		api.get('types')
		        .then(response => dispatch(setTypes(response.data)))
		        .catch(err => { throw err })
    	}
	    if (!authors) {
	    	api.get('authors')
		        .then(response => dispatch(setAuthors(response.data)))
		        .catch(err => { throw err })
	    }   
    }, [])

    return (
	  	<Bar onSubmit={ onSubmit }>
	  		<div className="sections"> 
		  		<div className="filterSection">
			  		{ types &&
			  			<select filter="types" onChange={ onChange }>
			  				<option value={ 0 } defaultValue style={ { display: "none" } }>types</option>
			  				<option value={ 1 }>aucun</option>
			  				{ ((typeOptions = []) => {
			  					for (let key in types) {
			  						let condition = body["types"] && body["types"][types[key]["name"]]
			  						typeOptions.push(
			  							<option 
			  								value={ types[key].name }
			  								className={ condition ? "active" : "" }
			  								key={ key }
			  							>
			  								{ types[key].name }
			  							</option>
			  						)
			  					}
			  					return typeOptions
			  				})() }
			  			</select>
			  		}
			  		{ authors &&
			  			<select filter="authors" onChange={ onChange }>
			  				<option value={ 0 } defaultValue style={ { display: "none" } }>authors</option>
			  				<option value={ 1 }>aucun</option>
			  				{ ((authorOptions = []) => {
			  					for (let key in authors) {
			  						let condition = body.authors && body.authors[authors[key]["first_name"] + " " + authors[key]["last_name"]]
			  						authorOptions.push(
			  							<option 
			  								className={ condition ? "active" : "" }
			  								value={ authors[key]["first_name"] + " " + authors[key]["last_name"] }  
			  								key={ key }
			  							>
			  								{ authors[key]["first_name"] + " " + authors[key]["last_name"] }
			  							</option>
			  						)
			  					}
			  					return authorOptions
			  				})() }
			  			</select>
			  		}
			  	</div>
			  	<div className="tagSection">
		  			{ tags && tags }
		  		</div>
		  	</div>
		  	<div className="buttonWrapper">
		  		<button type="submit">Filtrer</button>
		  	</div> 	
	  	</Bar>
    )
}

export default FilterBar

const Bar = styled.form`
	width: 80%;
	margin: auto;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	margin-bottom: 45px;

	.sections {
		width: calc(100% - 120px);
		display: flex;
		flex-direction: column;
		align-items: center;

		.filterSection {
			width: 100%;
			margin: auto;
			display: flex;
			align-items: center;

			select {
				.active {
					background-color: orange;
				}
			}
		}

		.tagSection {
			width: 100%;
			display: flex;
			align-items: center;
			min-height: 26px;
			padding: 2px;
			flex-wrap: wrap;
			box-sizing: border-box;

			p {
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 11px;
				padding: 1px 7px;
				border: 1px solid purple;
				box-sizing: border-box;

				span {
					color: red;
					margin-bottom: -1px;
					cursor: pointer;
				}
			}
		}
	}

	.buttonWrapper {
		width: 120px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		button {
			width: 80px;
			height: 30px;
			background-color: green;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}
	}
`