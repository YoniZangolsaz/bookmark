import * as React from 'react';
import SignIn from './pages/SignIn';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Button from './pages/Button';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InfoProvider } from './InfoContext';
import Action from './pages/Action';
import Create from './pages/CreateUser';
import EditUser from './pages/EditUser';
// import EditPgaes from './pages/EditPgaes';
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
            <Route path='/button' element={<Button />} />
            <Route path='/action' element={<Action />} />
            <Route path='/create' element={<Create />} />
            <Route path='/edit' element={<EditUser />} />
            {/* <Route path='/editpage' element={<EditPgaes />} /> */}
            <Route path='*' element={<Button />} />
          </Routes>
        </InfoProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;


