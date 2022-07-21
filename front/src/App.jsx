import * as React from 'react';
import SignIn from './pages/SignIn';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Bookmark from './pages/Bookmark';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InfoProvider } from './InfoContext';
import SignUp from './pages/SignUp';
let theme = createTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif',
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <InfoProvider>
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/bookmark' element={<Bookmark />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Bookmark />} />
          </Routes>
        </InfoProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


