import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, NavLink as Link} from "react-router-dom";

const HeaderComponent = () => {
  return (
    <Nav>
        <h1>Library</h1>
        <ul>
          <Link to="/" activeStyle={{ color: 'orange' }}>Home</Link>
          <Link to="/books" activeStyle={{ color: 'orange' }}>Borrow books</Link>
        </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-bottom: 1.25px solid rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  
  h1 {
    margin: 0;
  }

  ul {
    display: flex;
    width: 60%;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export default HeaderComponent;
