import React, { useEffect, useState } from 'react'
import { AppBar,Avatar,Box,Button,IconButton,Toolbar,Typography } from '@mui/material'
import useStyles from './styles'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import decode from 'jwt-decode'
const Navbar = () => {
const classes=useStyles();
const navigate=useNavigate();
const dispatch=useDispatch();
const location=useLocation();
const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
// console.log(user)
useEffect(()=>{
  const token=user?.token;
//JWT
if(token){
  const decodedToken=decode(token)
  if(decodedToken.exp * 1000 < new Date().getTime())
  logout();
}
setUser(JSON.parse(localStorage.getItem('profile')))

},[location])
const logout=()=>{
dispatch({type:"LOGOUT"});
navigate('/')
setUser(null)
}

  return (
    <AppBar className={classes.appBar} position='static' color='inherit' sx={{display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"space-between" }} >
        <Box className={classes.brandContainer} >
            <Typography className={classes.heading} variant='h3' sx={{ml:"10px" }}>
                    Memoriae
                </Typography>
        </Box>
        <Toolbar className={classes.toolbar} sx={{mr:"10px"}}>
          {user?(
          <Box display={"flex"} sx={{alignItems:"center",justifyContent:"space-evenly"}} >
            <Box display={"flex"} sx={{justifyContent:"space-between",alignItems:"center",mr:"10px"}}>
            <Avatar className={classes.purple}  alt={user.result.name} src={user.result.imageUrl} sx={{mr:"5px"}}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant='body1' sx={{display:{xs:"none",sm:"block"}}}>{user.result.name}</Typography>
            </Box>
            
            <Button variant='contained' color="error" sx={{display:{xs:"none",sm:"block"}}} size="small" onClick={logout}>
            Logout
          </Button>
          <IconButton sx={{display:{xs:"block",sm:"none"},color:"red",alignItems:"center"}} size="small" onClick={logout}>
<PowerSettingsNewIcon/>
          </IconButton>
          </Box>):
          
          (
          <>
            {location?.pathname==="/auth"?(
            <Button variant='contained' color='primary' disabled className={classes.login} > Login</Button>
            ):(<Link to="/auth"><Button variant='contained' color='primary' className={classes.login} > Login</Button>
            </Link>)}
          
          </>
          )}
        </Toolbar>
                
            </AppBar>
  )
}

export default Navbar