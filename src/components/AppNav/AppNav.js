import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Navbar, Nav, NavItem } from 'reactstrap';
import navItems from '../../config/Sections.json';
import SearchBar from '../SearchBar/SearchBar';
import UserContext from '../../contexts/UserContext';

const AppNav = (props) => {
  
  return (
    <Navbar color="light">
      <Nav >
        <Link to='/'>| Home |</Link>
      </Nav>
      <Nav>
        {
          navItems.map((navItem, index) =>
            <Link to={`/sections/${navItem.label.toLowerCase()}`} key={index}>
              | { navItem.label } |
            </Link>
        )}
      </Nav>
        < SearchBar handleFilterText={props.handleFilterText}/>
      <UserContext.Consumer>
        {user => (
          user.use 
            ?
            <NavLink to='/add-article' >
              <Button color='info' className=''>
                Add Article
              </Button>
            </NavLink>
            :
            <Button disabled color='info' className=''>
                Add Article
            </Button> 
          )}
      </UserContext.Consumer>
      <UserContext.Consumer>
        {user => (
          user.use ?
          <NavLink to='/logout'>
            <Button color='outline-danger' className='btn '>
              Logout
            </Button>
          </NavLink>
          :
          <NavLink to='/login'>
            <Button color='success' className='btn-success' onClick={console.log(user)} >
              Login
            </Button>
          </NavLink>
        )}
      </UserContext.Consumer>
    </Navbar>
  )
}

export default AppNav;
