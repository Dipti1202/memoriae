import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({name,label,half,type,handleChange,autoFocus,handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half? 6: 12} >
        <TextField
        name={name}
        onChange={handleChange}
        required
        label={label}   
        variant='standard'
        fullWidth
        autoFocus={autoFocus}
        type={type}
        InputProps={name=== "password" ?{
            endAdornment:(
                <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                        {type==="password"? <Visibility/>:<VisibilityOff/>}

                    </IconButton>
                </InputAdornment>
            ),
        }: {}}
        />

        

    </Grid>
  )
}

export default Input