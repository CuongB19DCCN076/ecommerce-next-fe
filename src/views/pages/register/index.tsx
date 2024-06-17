// ** next
import { NextPage } from "next"

// ** mui
import {
    Box,
    Button,
    CssBaseline,
    Grid,
    InputAdornment,
    Paper,
    Typography,
    useTheme
} from "@mui/material"

// ** form, yup
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import IconifyIcon from "src/components/Icon";
import { useState } from "react";
import { IconButton } from "@mui/material";
import { EMAIL_REG, PASSWORD_REG } from "src/configs/regex";
import Link from "next/link";
import CustomTextField from "src/components/text-field";

type TProps = {

}

const schema = yup.object().shape({
    email: yup.string().required("The field is required").matches(EMAIL_REG, "The field is must email type"),
    password: yup.string().required("The field is required").matches(PASSWORD_REG, "The password is contain charactor, special charactor, number"),
    confirmPassword: yup.string().required("The field is required").matches(PASSWORD_REG, "The password is contain charactor, special charactor, number").oneOf([yup.ref('password'), ""], "The confirm password must match with the password"),
}).required();

type FormData = yup.InferType<typeof schema>;

const RegisterPage: NextPage<TProps> = () => {

    const theme = useTheme();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { handleSubmit, formState: { errors }, control } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        mode: "onBlur",
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => {
        console.log(data)
    }

    return (
        <Grid container component="main" sx={{ height: '100vh', bgcolor: theme.palette.background.paper }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: theme.palette.mode === 'light' ? 'url(/images/register-light.png)' : 'url(/images/register-dark.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{
                bgcolor: "transparent",
                height: "100%",
                width: "100%"
            }}>
                <Box
                    sx={{
                        my: {
                            xs: 8,
                            md: 20
                        },
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h2">
                        Sign up
                    </Typography>
                    <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                        <Box>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        placeholder="Input Email"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={Boolean(errors?.email)}
                                        helperText={errors?.email?.message}
                                    />

                                )}
                                name="email"
                            />
                        </Box>
                        <Box>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        autoComplete="current-password"
                                        placeholder="Input Password"
                                        autoFocus
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={Boolean(errors?.password)}
                                        helperText={errors?.password?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                                        {showPassword ? <IconifyIcon icon={"material-symbols:visibility-outline"} /> : <IconifyIcon icon={"material-symbols:visibility-off-outline"} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                )}
                                name="password"
                            />
                        </Box>
                        <Box>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="confirmpassword"
                                        label="Confirm Password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmpassword"
                                        autoComplete="current-password"
                                        placeholder="Input Password"
                                        autoFocus
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={Boolean(errors?.confirmPassword)}
                                        helperText={errors?.confirmPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        {showConfirmPassword ? <IconifyIcon icon={"material-symbols:visibility-outline"} /> : <IconifyIcon icon={"material-symbols:visibility-off-outline"} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                )}
                                name="confirmPassword"
                            />
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Box sx={{ display: "flex" }}>
                                    <Typography variant="body1" sx={{ mr: 1 }}>
                                        {"You have an account?"}
                                    </Typography>
                                    <Link href="/login" style={{ color: theme.palette.primary.main }}>{"Login"}</Link>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                    <Typography variant="h5" sx={{
                        my: 2,
                        mx: 2
                    }}>Or</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 3
                    }}>
                        <IconButton sx={{
                            color: "blue"
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" role="img" fontSize="1.875rem" className="iconify iconify--mdi" width="1em"
                                height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"></path>
                            </svg>
                        </IconButton>
                        <IconButton sx={{
                            color: "red"
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true" role="img" fontSize="1.875rem" className="iconify iconify--mdi" width="1em"
                                height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z"></path>
                            </svg>
                        </IconButton>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default RegisterPage