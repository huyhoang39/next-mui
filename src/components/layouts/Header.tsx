'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HeaderAvatar from '../HeaderAvatar';

interface Props {
  isLogin: boolean;
}

export default function Header({ isLogin }: Props) {
  const pathname = usePathname();
  const isLoginPage = pathname.indexOf('/login') !== -1;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href={'/'}>Pionero</Link>
          </Typography>
          {isLoginPage ? (
            <></>
          ) : isLogin ? (
            <HeaderAvatar />
          ) : (
            <Link href="/login">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
