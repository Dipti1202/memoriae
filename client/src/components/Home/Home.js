import React, { useEffect, useRef, useState } from 'react'
// import { getPosts } from './actions/posts'
import { getPosts } from './../../actions/posts'

import Posts from './../Posts/posts';
import Form from './../Form/Form';
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { AppBar, Typography, Container, Icon, Box, MenuItem, Toolbar, Grow, Grid, Paper } from '@mui/material'


const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId,setCurrentId]=useState()
    const listener=useRef(false)
    const user=JSON.parse(localStorage.getItem("profile"));

    useEffect(() => {
        if (listener.current) {
            // dispatch(getPosts());
            // listener.current = false;

        }
        else{
            listener.current=true;
            dispatch(getPosts());
            
        }

    }, [dispatch])

    
  return (
    <Grow in>
                <Container>
                    <Grid container display={"flex"} justifyContent={"space-between"} alignItems={"strech"} spacing={4} sx={{flexDirection:{xs:"column-reverse", sm:"row"}}}>
                        <Grid item xs={12} sm={7} minHeight={"500px"}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
            
  )
}

export default Home