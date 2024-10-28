'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Container, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@/components/form/FormInput';
import useLogin from '@/hooks/useLogin';
import { hardNavigate } from '@/lib/utils/router';

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

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: '100px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
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
          <FormInput control={control} name="email" label="Email" type="email" disabled={isLoading} />
          <FormInput control={control} name="password" label="Password" type="password" disabled={isLoading} />
          <Button variant="contained" type="submit" fullWidth disabled={isLoading || !!Object.keys(errors).length}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
