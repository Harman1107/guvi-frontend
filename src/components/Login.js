import React, { useState } from 'react'
import { Button, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

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

const Login = ({setLoggedIn, setUser}) => {
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        axios.post(`/api/auth/login`, data).then(response =>{
            window.alert(response.data.msg);
            const token = response.data.token;
            localStorage.setItem("TOKEN", JSON.stringify(token));
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            setLoggedIn(true);
            navigate("/")

        }).catch(error=>{
            console.log(error);
            if (error.reponse.data.success === false) {
                window.alert(error.response.data.msg);
            }
        });
    }


return (
    <>
        <CssBaseline />
        <div className={classes.root}>
            <Typography variant='h2' gutterBottom component='h2' className={classes.heading} marginTop={5}>Login here</Typography>

            <Box marginTop={5} component='form' className={classes.form} onSubmit={handleSubmit} >
                <FormControl fullWidth sx={{ m: 1 }} variant="outlined" required>
                    <InputLabel htmlFor='email'>Email</InputLabel>
                    <OutlinedInput id='email' type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl marginTop={3} fullWidth sx={{ m: 1 }} variant="outlined" required >
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
                <Button sx={{ m: 1 }} className={classes.form} variant="contained" type="submit" >Login</Button>
                <a href="/register">New User? Register here</a>
            </Box>
        </div>
    </>
)
}

export default Login