import React, {useState} from 'react'
import { Button, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from "axios";
import { useNavigate } from 'react-router-dom'
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        heading: {
            color: blue[900]
        },
        form: {
            width: "30%",
        }
    })
)

const Register = ({isLoggedIn}) => {
    const navigate = useNavigate();
    const classes = useStyles();

const [showPassword, setShowPassword] = useState(false);
const [confirmShowPassword, setConfirmShowPassword] = useState(false);

const[password, setPassword] = useState("");
const[confirmPassword, setConfirmPassword] = useState("");
const[email, setEmail] = useState("");
const[name, setName] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfirmShowPassword = () => setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(confirmPassword === password){
        const data = {
            name,
            email,
            password
        }
        axios.post(`/api/auth/register`, data).then(response =>{
            console.log(response.data);
            window.alert(response.data.msg);
            navigate("/login")

        }).catch(error =>{
            if(error.reponse.data.success === false){
                window.alert(error.response.data.msg);
            }
        });
    }
    else{
        window.alert("Passwords Do NOT Match");
    }
  }

    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                <Typography variant='h2' gutterBottom component='h2' className={classes.heading} marginTop={5}>Register here</Typography>

                <Box marginTop={5} component='form' className={classes.form} onSubmit={handleSubmit}>
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined" required>
                        <InputLabel htmlFor='name'>Name</InputLabel>
                        <OutlinedInput id='name' type='text' label='name' value={name} onChange={(e) => setName(e.target.value)} />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined" required>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <OutlinedInput id='email' type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined" required >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }} variant="outlined" required >
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirmPassword"
                            type={confirmShowPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end"> 
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickConfirmShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <Button sx={{m:1}} className={classes.form} variant="contained" type="submit" >Register</Button>
                    <a href="/login">Already Registered? Login here</a>
                </Box>
            </div>
        </>
    )
}

export default Register