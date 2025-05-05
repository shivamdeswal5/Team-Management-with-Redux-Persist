import style from './style.module.css'
import Box from '@mui/material/Box';
import {
    Typography, Grid, Stack, Button
} from '@mui/material';
import TextField from '@mui/material/TextField';
import coverImg from '../../assets/signup-images/image.png'
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router";
import { Link } from "react-router";
import {useSelector } from "react-redux";


const schema = yup
    .object({
        email: yup.string().email("Invalid Email Format").required("Email is required"),
        password: yup.string().required().min(6),
    })
    .required()

export default function Signup() {

    const { user } = useSelector((state) => state);
    const { team } = useSelector((state) => state);

    const navigate = useNavigate();

    type User = {
        name:string
        email: string
        password: string
        confirmPassword: string
        organization: string
        role: string
    }

    type Inputs = {
        email:string
        password: string
    }

    // const getUsers = localStorage.getItem('user') || "[]";
    // const users = JSON.parse(getUsers);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: Inputs) => {
        const matchedUser = user.users.find((user: User) =>
            user.email === data.email && user.password === data.password
        );
    
        if (matchedUser) {
            console.log("Login Successful. Welcome:", matchedUser.name);
            sessionStorage.setItem("currentUser", JSON.stringify(matchedUser));
    
            if (matchedUser.role === "admin") {
                navigate("/admin");
            } else {
                const isTeamLead = team.teams.some((team: any) => team.lead === matchedUser.name);
    
                if (isTeamLead) {
                    navigate("/teamlead");
                } else {
                    navigate("/user");
                }
            }
        } else {
            alert("Invalid Email or Password");
            console.log("Login Failed");
        }
    
        reset();
    };
    
    

    return (
        <>
            <Grid
                container
                spacing={{ xs: 2, md: 10 }} columns={{ xs: 4, sm: 8, md: 12 }}
                className={style.bgColor}
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6rem",
                    height: "100vh",
                    gridTemplateColumns: 'repeat(2, 1fr)',
                }}
            >
                <Box display={{ xs: 'none', md: 'none', sm: 'none', lg: 'block' }}>
                    <img src={coverImg} alt="coverimg" />
                </Box>

                <Stack direction={{ xs: 'column', sm: 'column' }}
                    spacing={{ xs: 2, sm: 4, md: 4 }}>

                    <Typography variant="h3" component="h2">
                        Login
                    </Typography>

                    <Box sx={{ color: 'gray' }}>
                        New User? <Link className={style.linkColor} to="/signup">Signup</Link>
                    </Box>

                    <form className={style.formClass} onSubmit={handleSubmit(onSubmit)}>

                        <Box className={style.flex}>
                            <TextField
                                {...register('email')}
                                id="outlined-required"
                                label="Email"
                                placeholder='Required'
                                className={style.changeColor}
                                name="email"

                                sx={{
                                    border: 'white',
                                    // Root class for the input field
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        // Class for the border around the input field
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "",
                                        },
                                    },
                                    // Class for the label of the input field
                                    "& .MuiInputLabel-outlined": {
                                        color: "rgba(160, 160, 160, 0.842)",
                                    },

                                    "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                            borderWidth: "3px",
                                        },
                                    },
                                    "&:hover:not(.Mui-focused)": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                    },

                                }}
                            />
                            {errors.email?.message}
                        </Box>

                        <Box className={style.flex}>
                            <TextField
                                {...register('password')}
                                id="outlined-required"
                                label="Password"
                                placeholder='Required'
                                className={style.changeColor}
                                name="password"
                                sx={{
                                    border: 'white',
                                    // Root class for the input field
                                    "& .MuiOutlinedInput-root": {
                                        color: "white",
                                        // Class for the border around the input field
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "",
                                        },
                                    },
                                    // Class for the label of the input field
                                    "& .MuiInputLabel-outlined": {
                                        color: "rgba(160, 160, 160, 0.842)",
                                    },

                                    "&.Mui-focused": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                            borderWidth: "3px",
                                        },
                                    },
                                    "&:hover:not(.Mui-focused)": {
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: "white",
                                        },
                                    },

                                }}
                            />
                            {errors.password?.message}
                        </Box>

                        <Button type='submit' variant="contained"
                            sx={{ color: 'white', backgroundColor: '#7055b5', border: '0px' }}
                            className='submitBtn'
                        > Login</Button>

                    </form>
                </Stack>

            </Grid>

        </>
    )
}