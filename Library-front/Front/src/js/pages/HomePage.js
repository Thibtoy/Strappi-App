import React from "react"
import { useDispatch, useSelector } from "react-redux"

import styled from "styled-components"

import Books from "../components/Books"

const HomePage = () => {
  const dispatch = useDispatch()

  return (
    <React.Fragment>
      <h2>Book List</h2>
      <Books/>
    </React.Fragment>
  )
}

export default HomePage;