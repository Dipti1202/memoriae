import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import Input from './Input';
import LockIcon from '@mui/icons-material/Lock';
import { GoogleLogin } from 'react-google-login'
import GoogleIcon from '@mui/icons-material/Google';
import { gapi } from 'gapi-script'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { signin, signup } from '../../actions/auth'
import dotenv from 'dotenv';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
// dotenv.config();

const Auth = () => {

  const state = null;
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const google_id= process.env.GOOGLE_CLIENT_ID;
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: "14128421363-9skk97n519mukj4687gjnnu1duon52ai.apps.googleusercontent.com",
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate))
    }
    else {
      dispatch(signin(formData, navigate))
    }

  }

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleShowPassword = () => {
    (
      setShowPassword((prevShowPassword) => !prevShowPassword)
    )
  }
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    handleShowPassword(false)
  }
  const onSuccess = async (res) => {

    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } })

      navigate('/')

    } catch (error) {
      console.log(error);
    }

  }
  const onFailure = (error) => {
    console.log(error)
    console.log("Google sign in was unsuccessful.Try again later")
  }

  return (
    <Container container=" main" maxWidth="xs" className={classes.authContainer}>
      <Paper elevation={16} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }} >
        <Avatar sx={{ color: "white", mt: "10px", bgcolor: "ActiveCaption" }} >
          <LockIcon variant="outlined" />

        </Avatar>
        <Typography variant='h5'>{isSignUp ? "Sign Up" : "Sign In"}

        </Typography>
        <Box >
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2} >
              {isSignUp &&
                (<>
                  <Input
                    type="text"
                    name='firstName'
                    label="First Name"
                    autoFocus
                    half
                    handleChange={handleChange} />
                  <Input
                    type='text'
                    name='lastName'
                    label="Last Name"
                    half
                    handleChange={handleChange} />
                </>)}
              <Input type="email" name="email" label="Email" handleChange={handleChange} />
              <Input type={showPassword ? "text" : "password"} name="password" label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword} />
              {isSignUp && (<Input type="password" name="confirmPassword" label="Repeat password" handleChange={handleChange} />)}
            </Grid>
            <Button variant='contained' color='primary' type='submit' fullWidth sx={{ mt: "10px", mb: "10px" }}>{isSignUp ? "Sign Up" : "Sign In"}</Button>
            <GoogleLogin
              clientId="14128421363-9skk97n519mukj4687gjnnu1duon52ai.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  color='secondary'
                  fullWidth
                  variant='contained'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<GoogleIcon />}
                >
                  Google sign in
                </Button>
              )}
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy='single_host_origin'
            />

            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp ? "Sign In" : "New here? Sign Up"}
                </Button>

              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  )
}

export default Auth