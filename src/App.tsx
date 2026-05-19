import { CssBaseline, GlobalStyles } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { palette } from './theme';

function App() {
  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          html: {
            scrollBehavior: 'smooth',
            backgroundColor: palette.background,
          },
          body: {
            margin: 0,
            minWidth: 320,
            backgroundColor: palette.background,
            overflowX: 'hidden',
          },
          '#root': {
            minHeight: '100vh',
            overflowX: 'hidden',
          },
          '::selection': {
            background: palette.accent,
            color: palette.ink,
          },
          'a, button': {
            WebkitTapHighlightColor: 'transparent',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contato" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
