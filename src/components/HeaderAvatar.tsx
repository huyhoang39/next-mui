import { logout } from '@/lib/session/client';
import { hardNavigate } from '@/lib/utils/router';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HeaderAvatar() {
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNext = (callback: () => void) => {
    handleCloseUserMenu();
    callback();
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    hardNavigate('/login');
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
        <MenuItem onClick={() => handleNext(() => router.push('/profile'))}>
          <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
