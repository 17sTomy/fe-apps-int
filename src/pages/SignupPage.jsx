import { useState } from 'react';

import useAuth from '../hooks/useAuth.js';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
  ThemeProvider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
import { DashboardLayout } from '../template/DashboardLayout';

export const SignupPage = () => {
  const { handleSignup, showSnackbar, handleCloseSnackbar, authError } = useAuth();
  const { materialTheme } = useTheme();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <DashboardLayout>
      <Container component="main" maxWidth="xs">
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={showSnackbar}
          onClose={handleCloseSnackbar}
          autoHideDuration={5000}>
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}>
            ¡Ups! Parece que hubo un problema. Asegurate de que el correo electrónico y la
            contraseña sean válidos.
          </Alert>
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear cuenta
          </Typography>
          <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              error={authError}
            />
            <FormControl margin="normal" required fullWidth variant="outlined" error={authError}>
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                autoComplete="password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth variant="outlined" error={authError}>
              <InputLabel htmlFor="outlined-adornment-password">Confirmá tu contraseña</InputLabel>
              <OutlinedInput
                id="password-repeat"
                name="password-repeat"
                autoComplete="password-repeat"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirmá tu contraseña"
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Crear cuenta
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {'Ya tenés cuenta? Ingresá'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </DashboardLayout>
  );
};
