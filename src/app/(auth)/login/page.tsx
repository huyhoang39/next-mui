'use client';

import useLogin from '@/hooks/useLogin';
import { hardNavigate } from '@/lib/utils/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({
      message: 'Email is not valid',
    }),
  password: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .min(8, {
      message: 'Password must be at least 8 characters long',
    }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Page() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoading, login } = useLogin();

  const handleLogin = async (data: LoginSchema) => {
    await login({
      email: data.email,
      password: data.password,
    });

    hardNavigate('/');
  };

  console.log('errors: ', Object.keys(errors).length);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}
          onSubmit={handleSubmit(handleLogin)}
        >
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                required
                fullWidth
                autoComplete="email"
                label="Email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
                error={!!fieldState.error}
                helperText={!!fieldState.error ? fieldState.error?.message : undefined}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                required
                fullWidth
                autoComplete="password"
                label="Password"
                type="password"
                value={field.value}
                onChange={field.onChange}
                disabled={isLoading}
                error={!!fieldState.error}
                helperText={!!fieldState.error ? fieldState.error?.message : undefined}
              />
            )}
          />
          <Button variant="contained" type="submit" fullWidth disabled={isLoading || !!Object.keys(errors).length}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
