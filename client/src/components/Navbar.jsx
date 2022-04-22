import React from 'react'
import Button from '@mui/material/Button';

import { ThemeProvider } from '@mui/material/styles';


const Navbar = props => {

    return (
        < div className="d-flex gap-3 justify-content-center">
            <ThemeProvider theme={props.theme}>
                <Button variant="contained" color="primary" >
                    <a href="/cards" className="text-reset text-decoration-none">Cards</a>
                </Button>
                <Button variant="contained" color="primary" >
                    <a href="/spreads" className="text-reset text-decoration-none">Spreads</a>
                </Button>
            </ThemeProvider>


        </div >
    )
}


export default Navbar;

