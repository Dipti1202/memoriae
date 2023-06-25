import React, { useEffect, useRef, useState } from 'react'
import useStyles from './styles'
import { Button, Paper, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import FileBase from 'react-file-base64'
import {useDispatch} from 'react-redux'
import {createPost} from '../../actions/posts.js'
import { updatePost } from '../../actions/posts.js'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'


const Form =({currentId,setCurrentId})=>{
const post = useSelector((state) => currentId?state.posts.find((p)=>p._id===currentId):null)
    const [postData,setPostData]=useState({title:'',message:'',tags:'',selectedFile:''})

    const  classes=useStyles()
    const dispatch=useDispatch();
    const user=JSON.parse(localStorage.getItem("profile"))
const listener=useRef(true)
const location=useLocation();
 
    useEffect(()=>{
        
        {if(post) 
        setPostData(post);}
    },[post])
    
const darkTheme=createTheme({ palette: { mode: 'dark' } })

    if(!user?.result){
        return(
            <ThemeProvider theme={darkTheme}>
            <Paper className={classes.paper} sx={{display:"flex",alignItems:"center",justifyContent:"center"}} elevation={24}>
                <Typography align='center'>
                    Please login to like and create your own posts.
                </Typography>
            </Paper>
            </ThemeProvider>
        )

    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        // console.log("Submitted")
        if(currentId){
            
            dispatch(updatePost(currentId,{...postData,name:user?.result?.name}))
            
        }
        else{
            dispatch(createPost({...postData,name:user?.result?.name}))

        }
        clear();

    }
    
    const clear=()=>{
        setCurrentId(null);
        setPostData({title:'',message:'',tags:'',selectedFile:''})
    }
    return(
        <Paper className={classes.paper} id="createForm" sx={{}}>
            <form autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId?'Edit Post':'Create Post'}</Typography>
                <TextField 
                
                name='title' 
                variant='standard' 
                fullWidth 
                label='title'
                required
                value={postData.title}
                onChange={(e)=>(setPostData({...postData,title:e.target.value}))}></TextField>
                <TextField 
                required
                name='message' 
                variant='standard' 
                fullWidth 
                label='message'
                value={postData.message}
                onChange={(e)=>(setPostData({...postData,message:e.target.value}))}></TextField>
                <TextField 
                required
                name='tags' 
                variant='standard' 
                fullWidth 
                label='tags'
                value={postData.tags}
                onChange={(e)=>(setPostData({...postData,tags:e.target.value.split(',')}))}></TextField>
                <div className={classes.fileInput} >
                <FileBase 
                type="file"
                // hidden
                multiple={false}
                onDone={({base64})=>(setPostData({...postData,selectedFile:base64}))}
                
                />
            </div>
            <Button className={classes.buttonSubmit} variant='contained' size="large" type="submit" fullWidth>Submit</Button>
            <Button variant='contained' color="secondary" size="large" onClick={clear} fullWidth sx={{mt:"10px"}}>Clear</Button>
            </form>
            
        
</Paper>
    )
}
export default Form;
