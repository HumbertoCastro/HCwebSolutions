import { CssBaseline, GlobalStyles } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { PageTransition } from './components/PageTransition';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { palette } from './theme';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/contato"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

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
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
