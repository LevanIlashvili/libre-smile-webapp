import React, {useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Box, Grid, IconButton, Toolbar, Typography, withStyles } from '@mui/material';
import { Container } from '@mui/system';
import libreLogo from './assets/images/libre.svg';
import Button from '@mui/material/Button';
import LibreClient, { User } from './service/LibreClient';
import { FaceDetector } from './components/FaceDetector';

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
  const [user, setUser] = useState<User>();

  const login = async() => {
    const loginResult = await LibreClient.login();
    if (loginResult) {
      const {user} = loginResult;
      setUser(user!);
    }
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
          <Grid component="div" sx={{ flexGrow: 1 }}>
            <img src={libreLogo} style={styles.logo} alt="Libre Logo" />
          </Grid>
          {
            !user && <Button color="inherit" onClick={login}>Connect</Button>
          }
          {
            user && <Button color="primary">Welcome, {user.actor}</Button>
          }
          
        </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Box>
          {
            !user && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
              >
                Please connect your wallet
              </Box>
            )
          }
          {
            user && (
              <FaceDetector user={user.actor} />
            )
          }
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;