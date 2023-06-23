import React from 'react'

import useStyles from './styles'
import { AppBar, Typography, Container, Icon, Box, Button, Grid, Card, Drawer, Toolbar, List, ListItem, ListItemText, Divider, Switch, FormControl, Paper, Tooltip, TextField, CardMedia, CardContent, CardActionArea, IconButton } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import dispatch from\
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import moment from 'moment'

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch()

    const classes = useStyles()
    const user=JSON.parse(localStorage.getItem("profile"))
    
const Likes=()=>{
    if(post.likes.length>0){

        return post.likes.find((like)=>like===(user?.result?.googleId || user?.result?._id))?(
            <>
            <ThumbUpIcon fontSize='small'/>
            <Typography color={"primary"} variant='body1'>&nbsp;{post.likes.length>2?`You and ${post.likes.length-1} others`:`${post.likes.length} like${post.likes.length>1?'s':""}`}</Typography>
                </>
        ):(
            <>
            <ThumbUpOffAltIcon fontSize='small'/>
            <Typography color={"primary"} variant='body1'>&nbsp;{post.likes.length} {post.likes.length===1? 'Like':"Likes"}</Typography></>
        )
    }
    return <><ThumbUpOffAltIcon fontSize='small'/><Typography color={"primary"} variant='body1'>&nbsp;Like</Typography></>
}
    return (
        <Card

            sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                height: "100%"

            }}>

            <CardMedia
                className={classes.media}
                sx={{ height: 200 }}
                component="img"
                image={post.selectedFile}
                title={post.title}
            />
            <Box className={classes.media}></Box>
            <Box className={classes.overlay}>
                { (user?.result)&&(<Typography variant='h6' className={""}>
                    {post.name}
                </Typography>)}
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </Box>
            {(user?.result?.googleId===post.creator || user?.result?._id === post.creator) && (
                        
                        <Box className={classes.overlay2}>
                        <IconButton sx={{ color: "white" }} onClick={() => setCurrentId(post._id)}><EditIcon /></IconButton>
                    </Box>

                    )}
           
            <Box sx={{ mt: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography color={"grey"} paddingLeft={"16px"} >{post.tags.map((tag, i) => `#${tag} `)}</Typography>
                <Typography variant='h5' gutterBottom className={classes.title} >
                    {post.title}
                </Typography>

            </Box>
            
            {(user?.result)&&(<Box display={"flex"} flexDirection={"column"} sx={{ padding: "16px", justifyContent: "space-between", mt: "10px", height: "100%" }}>

                <Box>
                    <Typography color={"text.secondary"}>{post.message}</Typography>
                </Box>

                <Box className={classes.cardActions} flexWrap={"wrap"}>
                    <Box display={"flex"} flexDirection={'row'} alignItems={"center"} >
                        {(user?.result)&&(
                            <IconButton  onClick={() => dispatch(likePost(post._id))} color={"primary"}>
                            <Likes />
                        </IconButton>
                        )}

                    </Box>
                    
                    {(user?.result?.googleId===post.creator || user?.result?._id === post.creator) && (
                        <Box >
                        <IconButton aria-label="delete" onClick={() => dispatch(deletePost(post._id))} color='error' >
                            <DeleteIcon />
                        </IconButton>
                    </Box>


                    )}
                    
                </Box>

            </Box>)}

        </Card>



    )
}
export default Post;