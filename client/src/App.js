import React, { useEffect, useRef, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import { Container, ThemeProvider, createTheme } from '@mui/material'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'



const App = () => {
    const lightTheme=createTheme({ palette: { mode: 'light' } })

    return (
        <ThemeProvider theme={lightTheme}>
        <Container maxWidth="lg">
            <Router>
            
            <Navbar/>
                <Routes>
                    <Route exact path='/' element={<Home/>}/>
                <Route path='/auth' element={<Auth/>}/>
                </Routes>
            </Router>
        </Container>
        </ThemeProvider>


    )
}
export default App;