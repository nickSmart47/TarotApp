import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const Navbar = props => {

    return (
        < div className="d-flex gap-3 justify-content-center">
            <ThemeProvider theme={props.theme}>
                <Button variant="contained" color="primary">
                    <a href="/" className="text-reset text-decoration-none">Home</a>
                </Button>
                <Button variant="contained" color="primary" >
                    <a href="/cards" className="text-reset text-decoration-none">Cards</a>
                </Button>
                <Button variant="contained" color="primary" >
                    <a href="/spreads" className="text-reset text-decoration-none">Spreads</a>
                </Button>
                <Button variant="contained" color="primary" >
                    <a href="/login" className="text-reset text-decoration-none">Login</a>
                </Button>
                <Button variant="contained" color="primary" >
                    <a href="/register" className="text-reset text-decoration-none">Register</a>
                </Button>
            </ThemeProvider>


        </div >
    )
}

Navbar.propTypes = {};

export default Navbar;

