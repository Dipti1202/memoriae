import React, { useEffect } from 'react';
import Post from './Post/Post';
import { useSelector } from 'react-redux';

import useStyles from './styles'
import { CircularProgress, Grid,Box } from '@mui/material';

const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => (state.posts))
    const classes = useStyles()
    const user=JSON.parse(localStorage.getItem("profile"));
    useEffect(()=>{},[posts,user])

    // console.log(posts);
    return (
        !posts.length ? <Box display={"flex"} justifyContent="center" alignContent={"center"}height={"100%"} alignItems={"center"}><CircularProgress /></Box> :
            (<Grid className={classes.mainContainer} container spacing={5}>
                {posts.map((post) => (
                    <Grid  key={post._id} item xs={12} sm={12} md={6} alignItems={"stretch"} >
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>
                ))}

            </Grid>)


    )
}
export default Posts;