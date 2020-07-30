import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";

import HomePage from "./pages/HomePage"
import Modale from "./modales/Modale"
import HeaderComponent from "./components/Header"

import '../css/style.css'

const App = () => {
  const dispatch = useDispatch()

  return (
    <Router>
      <HeaderComponent />

      {/*isModalShowing && <Modale />*/}

      <Body>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </Body>
    </Router>
  )
}

export default App

const Body = styled.div`
    text-align: center;
    min-height: calc(100vh - 70px);
    background-color: lightgrey;
`