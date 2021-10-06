import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase/clientApp';
import Router from 'next/router'
import Link from 'next/link'

export default function MenuAppBar() {
  const [user, loading, error] = useAuthState(auth);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {

    if (user) {
      await auth.signOut()
    } else {
      Router.push('/auth')
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="navbar">
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={user ? true : false}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={user ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          <MenuIcon />

          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="navbar__brand">
            <Link href="/">
              <a>
                Get Ranked
              </a>
            </Link>
          </Typography>

          {user && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
