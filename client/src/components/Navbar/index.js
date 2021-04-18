import React from 'react'
import {
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { clear as loginClear } from '../../store/features/login';
import { clear as chatClear } from '../../store/features/chat';
import { clear as uploadClear } from '../../store/features/upload';
import { clear as userClear } from '../../store/features/user';


export const NavbarComponent = () => {
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem("_Auth"));
    const dispatch = useDispatch()
    const handleSelect = (eventKey) => {
        // Clear token
        if (eventKey * 1 === 1) {
            localStorage.removeItem("_Auth")
            history.push("/")
            dispatch(loginClear())
            dispatch(chatClear())
            dispatch(uploadClear())
            dispatch(userClear())
        }
    }
    return (
        <Navbar bg="primary">
            <Navbar.Brand href="/home">Application Real Time Chat</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Nav onSelect={handleSelect} activeKey="0">
                        <NavDropdown title={user ? user.name : "USER"} id="nav-dropdown">
                            <NavDropdown.Item eventKey="1" bg='white'>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    )
}
