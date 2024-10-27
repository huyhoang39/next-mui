import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HeaderAvatar from '../HeaderAvatar';

const isLogin = true;

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLogin ? <HeaderAvatar /> : <Button color="inherit">Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
