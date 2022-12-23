import React, {useState} from 'react'
import Navbar from "./Navbar";
import { Button, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { blue } from '@mui/material/colors'
import { Box } from '@mui/system'
import { Label, Visibility, VisibilityOff } from '@mui/icons-material'
import axios from 'axios';


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


const Home = ({ isLoggedIn, user, setUser, setLoggedIn}) => {
  console.log(isLoggedIn);
  
  const classes = useStyles();

  const handleSubmit = (e) =>{
    e.preventDefault();
    const email = user.email;
    const data = {
      email,
      name,
      age,
      mobile,
      gender,
      dob
    }

    axios.post(`/api/auth/update`, data).then(response =>{
      window.alert(response.data.msg);
      console.log(response.data);
    }).catch(error =>{
      console.log(error);
    })

    setUser(data);
  }

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");

  return (
    <div className={classes.root}>
    <CssBaseline />
      <Navbar isLoggedIn={isLoggedIn} user={user} setUser={setUser} setLoggedIn={setLoggedIn} />
      {isLoggedIn ? <>
        <Box marginTop={5} component='form' className={classes.form} onSubmit={handleSubmit}>
        <Typography>{user.name}</Typography>
                <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                        <InputLabel htmlFor='name'>Name</InputLabel>
                        <OutlinedInput id='name' type='text' label='name' value={name}onChange={(e)  => setName(e.target.value)}/>
                    </FormControl>
                    <Typography>{user.age}</Typography>
                    <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                    
                        <InputLabel htmlFor='age'>Age</InputLabel>
                        <OutlinedInput id='age' type='number' label='age' value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age"/>
                    </FormControl>
                    <Typography>{user.mobile}</Typography>
                    <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                   
                        <InputLabel htmlFor='mobile'>Mobile</InputLabel>
                        <OutlinedInput id='mobile' type='number' label='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                    </FormControl>
                    <Typography>{user.gender}</Typography>
                    <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                    
                        <InputLabel htmlFor='gender'>Gender</InputLabel>
                        <OutlinedInput id='gender' type='text' label='gender' value={gender} onChange={(e) => setGender(e.target.value)} />
                    </FormControl>
                    <Typography>{user.dob}</Typography>
                    <FormControl fullWidth sx={{ m: 2 }} variant="outlined">
                 
                        <InputLabel htmlFor='dob'></InputLabel>
                        <OutlinedInput id='dob' type='date' label='dob' value={dob} onChange={(e) => setDob(e.target.value)} />
                    </FormControl>
                    

                    <Button sx={{m:1}} className={classes.form} variant="contained" type="submit" >Update Profile</Button>
                </Box>
      </>:
      <>
      <Typography variant='h2' gutterBottom component='h2' className={classes.heading} marginTop={5}>Please Login to view Profile</Typography>
      </>}
    </div>
  )
}

export default Home