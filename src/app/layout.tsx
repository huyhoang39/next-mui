import './globals.css';

import { Box, Container, CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';

import Header from '@/components/layouts/Header';
import { getSession } from '@/lib/session/server';
import theme from '@/theme';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getSession();
  const isLogin = !!auth?.user?.email;

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles
              styles={{
                'input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px transparent inset !important',
                  WebkitTextFillColor: 'var(--base-color) !important',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
              }}
            >
              <Header isLogin={isLogin} />
              <Container
                sx={{
                  flex: 1,
                  pt: '20px',
                }}
              >
                {children}
              </Container>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
