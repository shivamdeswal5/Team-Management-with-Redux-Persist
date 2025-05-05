import style from './style.module.css'
import Box from '@mui/material/Box';
import {
    Typography, Grid, Stack, Button, FormControlLabel,RadioGroup
} from '@mui/material';
import TextField from '@mui/material/TextField';
import coverImg from '../../assets/signup-images/image.png'
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import Radio from '@mui/material/Radio';
import { pink } from '@mui/material/colors';
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from '../../redux/slices/user/userSlice'


const schema = yup
    .object({
        name: yup.string().required("name is required"),
        email: yup.string().email("Invalid Email Format").required("Email is required"),
        password: yup.string().required().min(6),
        confirmPassword: yup.string().label('Confirm Password').required().oneOf([yup.ref('password')], 'Passwords must match'),
        organization: yup.string().required("Organization is Required.. "),
        role: yup.string().required("Select atleast one role")
    })
    .required()

export default function Signup() {

    const { user } = useSelector((state) => state);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    type Inputs = {
        name: string
        email: string
        password: string
        confirmPassword: string
        organization: string
        role: string
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data: Inputs) => {

        dispatch(addUser(data));
        console.log("Data inside REdux: ",user);

        const isEmailExists = user.users.some(user => user.email.toLowerCase() === data.email.toLowerCase());

        console.log("Is email already registered?", isEmailExists);
        if (isEmailExists) {
            alert("This email is already registered. Please login or use a different email.");
            reset();
            return;
        }
        navigate('/login');
        reset();
    };

    // const onSubmit = (data: Inputs) => {

    //     const getUsers = localStorage.getItem('user') || "[]";
    //     const prevUsers = JSON.parse(getUsers) as Inputs[];

    //     const isEmailExists = prevUsers.some(user => user.email.toLowerCase() === data.email.toLowerCase());

    //     console.log("Is email already registered?", isEmailExists);
    //     if (isEmailExists) {
    //         alert("This email is already registered. Please login or use a different email.");
    //         reset();
    //         return;
    //     }
    //     const updatedUsers = [...prevUsers, data];
    //     localStorage.setItem("user", JSON.stringify(updatedUsers));
    //     navigate('/login');
    //     reset();
    // };
    

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
                        Create an Account
                    </Typography>

                    <Box sx={{ color: 'gray' }}>
                        Already have an account?  <Link className={style.linkColor} to="/login">Login</Link>
                    </Box>

                    <form className={style.formClass} onSubmit={handleSubmit(onSubmit)}>

                        <Box className={style.flex}>
                            <TextField
                                {...register('name')}
                                id="outlined-required"
                                label="Full Name"
                                placeholder='Required'
                                className={style.changeColor}
                                name="name"

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

                        <Box className={style.flex} >
                            <TextField
                                {...register('confirmPassword')}
                                id="outlined-required"
                                label="Confirm Password"
                                placeholder='Required'
                                className={style.changeColor}
                                name="confirmPassword"
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
                            {<p>{errors.confirmPassword?.message}</p>}
                        </Box>

                        <Box className={style.flex} >
                            <TextField
                                {...register('organization')}
                                id="outlined-required"
                                label="Organization"
                                placeholder='Required'
                                className={style.changeColor}
                                name="organization"
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
                            {<p>{errors.organization?.message}</p>}

                        </Box>

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="admin" control={<Radio {...register('role')} sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                }} />} label="Admin" />
                            <FormControlLabel value="user" control={<Radio {...register('role')} sx={{
                                    color: 'white',
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                }} />} label="User" />
                        </RadioGroup>

                        <Button type='submit' variant="contained"
                            sx={{ color: 'white', backgroundColor: '#7055b5', border: '0px' }}
                            className='submitBtn'
                        > Signup</Button>

                    </form>
                </Stack>

            </Grid>

        </>
    )
}