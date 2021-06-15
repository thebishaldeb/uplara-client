import { useState } from "react";
import { Link } from "react-router-dom";

import styled from 'styled-components';
import { logout } from "../utils";

const Content = styled.div`
margin: 0 8%;
padding-bottom: 40px;
`
const Header = styled.div`
 border-bottom: 1px solid #E2E8F0;
`
const Nav = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
padding: 1rem 5%;
background: #973050;
padding-bottom: 0;
box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.65);
  @media screen and (max-width: 800px) {
      display: block;
      padding-bottom: 20px;
  }
`

const NavMenu = styled("div")<{isClicked?: any}>`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 20px;
@media screen and (max-width: 800px) {
  ${props =>
    props.isClicked ? `
    display: block;
    ` : `
    display: none;
    `}
 }
`

const NavItem = styled("span")<{isClicked?: any}>`
margin-left: 5rem;
list-style: none;
@media screen and (max-width: 800px) {
  ${props =>
    props.isClicked ? `
    display: block;
    margin: 30px 10px;
    ` : `
    display: none;
    `}
 }
`

const NavLink = styled(Link)`
font-size: 25px;
font-weight: 400;
color: white;
text-decoration: none;
  &:hover {
    color: black;
  }
`;

const NavLogo = styled(Link)`
font-size: 25px;
    font-weight: 500;
    color: white;
    text-decoration: none;
    margin-bottom: 20px;
`
const Button = styled("button")<{isClicked?: boolean}>`
  cursor: pointer;
  font-size: 16px;
  border-radius: 3px;
  border: 2px solid #db7093;
  padding: 8px 1em;
  transition: 0.5s all ease-out;
  color: #db7093;
  background: white;
  &:hover {
    background-color: #db7093;
    color: white;
  }
`;

const NavIcon = styled("i")`
 display: none;
 @media screen and (max-width: 800px) {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 40px;
    margin: 15px;
    color: white;
 }
`

const Navbar = ({children}: any) => {
  const [isClicked, setClicked] = useState(false)

  return (
      <>
    <Header>
        <Nav>
            <NavLogo to="/">Rock-Paper-Scissors</NavLogo>
            <NavMenu isClicked={isClicked}>
                <NavItem isClicked={isClicked}>
                    <NavLink to="/my-games">History</NavLink>
                </NavItem>
                <NavItem isClicked={isClicked}>
                    <NavLink to="/invites">Invites</NavLink>
                </NavItem>
                <NavItem isClicked={isClicked}>
                <Button onClick={() => logout()}>Log Out</Button>
                </NavItem>
            </NavMenu>
            <NavIcon onClick={()=> setClicked(!isClicked)} className="fa fa-bars"></NavIcon>
        </Nav>
</Header>
<Content>
{children}</Content>
</>
  );
};

export default Navbar;