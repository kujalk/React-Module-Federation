import React, { lazy, Suspense, useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Grid,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BookIcon from '@mui/icons-material/Book';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InfoIcon from '@mui/icons-material/Info';

// Lazy load the remote Catalog component
const RemoteCatalog = lazy(() => import('catalogApp/Catalog'));

const drawerWidth = 240;
const collapsedWidth = 60;

const App = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('home'); // Default to Home

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const handleAppBarClick = () => {
    setSelectedMenu('home');  // Reset to main page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar with Title and Toggle Button */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} onClick={handleAppBarClick}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Welcome to Library
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Expandable Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
        <ListItem disablePadding>
            <ListItemButton onClick={() => handleMenuClick('home')}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Home" />}
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleMenuClick('catalog')}>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              {open && <ListItemText primary="Book Catalog" />}
            </ListItemButton>
          </ListItem>
          
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {selectedMenu === 'catalog' ? (
          <Suspense fallback={<div>Loading Catalog...</div>}>
            <RemoteCatalog />
          </Suspense>
        ) : selectedMenu === 'home' ? (
          <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', backgroundColor: '#f3f3f3' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2e3b55' }}>
              <HomeIcon fontSize="large" sx={{ verticalAlign: 'middle', marginRight: 1 }} />
              Welcome to the Library
            </Typography>
            <Typography variant="body1" paragraph sx={{ color: '#5c6bc0' }}>
              Explore a variety of books, movies, and much more!
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '250px',
                    backgroundColor: '#FFEB3B',
                    borderRadius: '10px',
                  }}
                >
                  <LibraryBooksIcon sx={{ fontSize: 70, color: '#0D47A1' }} />
                </Paper>
                <Typography variant="h6" sx={{ marginTop: 2, color: '#0D47A1' }}>
                  Books
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '250px',
                    backgroundColor: '#FF7043',
                    borderRadius: '10px',
                  }}
                >
                  <MovieIcon sx={{ fontSize: 70, color: '#0D47A1' }} />
                </Paper>
                <Typography variant="h6" sx={{ marginTop: 2, color: '#0D47A1' }}>
                  Movies
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '250px',
                    backgroundColor: '#4CAF50',
                    borderRadius: '10px',
                  }}
                >
                  <InfoIcon sx={{ fontSize: 70, color: '#0D47A1' }} />
                </Paper>
                <Typography variant="h6" sx={{ marginTop: 2, color: '#0D47A1' }}>
                  Information
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Box>
    </Box>
  );
};

export default App;
