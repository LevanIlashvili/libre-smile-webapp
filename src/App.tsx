import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography, withStyles } from '@mui/material';
import { Container } from '@mui/system';
import libreLogo from './assets/images/libre.svg';
import Button from '@mui/material/Button';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const styles = ({
  logo: {
    height: 40,
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>

          <Grid component="div" sx={{ flexGrow: 1 }}>
            <img src={libreLogo} style={styles.logo} alt="Libre Logo" />
          </Grid>
          <Button color="inherit">Connect</Button>
        </Toolbar>
        </AppBar>
      </Box>
      <main>
      </main>
    </ThemeProvider>

  );
}

export default App;