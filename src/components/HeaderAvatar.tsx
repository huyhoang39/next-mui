'use client';

import { logout } from '@/actions/auth';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function HeaderAvatar() {
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    submitBtnRef.current?.click();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => router.push('/profile')}>
          <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
        <form action={logout} style={{ display: 'none' }}>
          <button type="submit" ref={submitBtnRef}></button>
        </form>
      </Menu>
    </Box>
  );
}
